import { ref } from 'vue';
import { useToast } from 'vue-toastification';

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch {
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

export function useShareLink() {
  const shareLink = ref('');
  const toast = useToast();
  async function copyLink(sessionId: string) {
    const link = `${window.location.origin}/sessions/${sessionId}`;
    shareLink.value = link;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        if (!fallbackCopy(link)) throw new Error('fallback failed');
      }
      toast.success('Ссылка скопирована!');
    } catch {
      toast.error('Не удалось скопировать ссылку');
    }
  }
  return {
    shareLink,
    copyLink,
  };
}
