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
      style={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-white p-8 rounded-2xl shadow-2xl text-center animate-scale-in w-[85vw] max-w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-xl text-orange-500 mb-3">{title}</h2>
        <p className="text-gray-600 mb-3 text-sm">{message}</p>
        <p className="text-3xl mb-4">{emoji}</p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors text-sm"
        >
          Yay!
        </button>
      </div>
    </div>
  );
}
