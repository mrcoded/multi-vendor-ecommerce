"use server";

export type NewsletterState = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { success: false, message: "Please enter your email address." };
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // Placeholder until a newsletter provider is wired up.
  return {
    success: true,
    message: "Thanks for subscribing! Watch your inbox for seller tips and deals.",
  };
}
