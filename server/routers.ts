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
        // Detect language from message or default to English
        const detectLanguage = (text: string): string => {
          // Simple language detection
          const arabicRegex = /[\u0600-\u06FF]/g;
          const frenchRegex = /\b(bonjour|salut|comment|merci|s'il vous plaît|oui|non)\b/gi;
          
          if (arabicRegex.test(text)) return 'ar';
          if (frenchRegex.test(text)) return 'fr';
          return 'en';
        };
        
        const detectedLanguage = detectLanguage(input.message);
        
        const systemPrompts: Record<string, string> = {
          en: `You are a professional marketing AI assistant for Events, A studio - a luxury events and photography agency in Marrakech, Morocco. 

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

Always be helpful, ask follow-up questions, and guide them toward booking a consultation. Respond in English.`,

          fr: `Vous êtes un assistant IA marketing professionnel pour Events, A studio - une agence d'événements et de photographie de luxe à Marrakech, Maroc.

Votre rôle est de:
1. Comprendre quel type d'événement intéresse le client (mariages, événements d'entreprise, séances photo, etc.)
2. Poser des questions clarifiantes sur les détails, le budget et les préférences de l'événement
3. Fournir des conseils d'experts sur la planification d'événements, les styles photographiques et les traditions marocaines
4. Recommander les services pertinents d'Events, A studio
5. Être chaleureux, professionnel et culturellement sensible

Services proposés:
- Mariages marocains et cérémonies de fiançailles
- Événements d'entreprise et team-building
- Dîners de gala et fêtes privées
- Photographie et vidéographie
- Séances photo de couple et séances de fiançailles
- Expériences liées au tourisme

Soyez toujours utile, posez des questions de suivi et guidez-les vers la réservation d'une consultation. Répondez en français.`,

          ar: `أنت مساعد ذكي متخصص في التسويق لـ Events, A studio - وكالة أحداث وتصوير فوتوغرافي فاخرة في مراكش، المغرب.

دورك هو:
1. فهم نوع الحدث الذي يهتم به العميل (الزفاف والأحداث الشركات وجلسات التصوير وما إلى ذلك)
2. طرح أسئلة توضيحية حول تفاصيل الحدث والميزانية والتفضيلات
3. تقديم نصائح خبراء حول تخطيط الأحداث وأنماط التصوير والتقاليد المغربية
4. التوصية بالخدمات ذات الصلة من Events, A studio
5. كن دافئًا واحترافيًا وحساسًا ثقافيًا

الخدمات المقدمة:
- الزفاف المغربي وحفلات الخطوبة
- أحداث الشركات والعمل الجماعي
- حفلات العشاء الفاخرة والحفلات الخاصة
- التصوير الفوتوغرافي والفيديو
- جلسات تصوير الأزواج وجلسات الخطوبة
- تجارب متعلقة بالسياحة

كن دائمًا مفيدًا واطرح أسئلة متابعة وأرشدهم نحو حجز استشارة. رد باللغة العربية.`,
        };
        
        const systemPrompt = systemPrompts[detectedLanguage] || systemPrompts.en;

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
