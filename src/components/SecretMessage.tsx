interface SecretMessageProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
  emoji: string;
}

export default function SecretMessage({
  show,
  onClose,
  title,
  message,
  emoji,
}: SecretMessageProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-white p-10 rounded-2xl shadow-2xl text-center animate-scale-in min-w-[280px] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-2xl text-orange-500 mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <p className="text-4xl mb-6">{emoji}</p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          Yay!
        </button>
      </div>
    </div>
  );
}
