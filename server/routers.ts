import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { saveChatConversation } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    sendMessage: publicProcedure
      .input(
        z.object({
          message: z.string(),
          conversationHistory: z.array(
            z.object({
              role: z.enum(["user", "assistant", "system"]),
              content: z.string(),
            })
          ),
          visitorId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const systemPrompt = `You are a professional marketing AI assistant for Events, A studio - a luxury events and photography agency in Marrakech, Morocco. 

Your role is to:
1. Understand what type of event the client is interested in (weddings, corporate events, photo sessions, etc.)
2. Ask clarifying questions about their event details, budget, and preferences
3. Provide expert advice on event planning, photography styles, and Moroccan wedding traditions
4. Recommend relevant services from Events, A studio
5. Be warm, professional, and culturally sensitive

Services offered:
- Moroccan Weddings & Engagement Ceremonies
- Corporate Events & Team Building
- Gala Dinners & Private Parties
- Photography & Videography
- Couple Photo Sessions & Engagement Shoots
- Tourism-related experiences

Always be helpful, ask follow-up questions, and guide them toward booking a consultation.`;

        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...input.conversationHistory,
          { role: "user" as const, content: input.message },
        ];

        try {
          const response = await invokeLLM({ messages });
          const assistantMessage =
            response.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";

          // Save conversation if visitorId provided
          if (input.visitorId) {
            const fullConversation = [
              ...input.conversationHistory,
              { role: "user" as const, content: input.message },
              { role: "assistant" as const, content: assistantMessage },
            ];
            await saveChatConversation(input.visitorId, fullConversation);
          }

          return {
            message: assistantMessage,
            success: true,
          };
        } catch (error) {
          console.error("[LLM] Error:", error);
          return {
            message: "I apologize, I'm having trouble processing your request. Please try again.",
            success: false,
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
