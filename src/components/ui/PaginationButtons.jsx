const paginationButtonClass =
  "cursor-pointer rounded-lg bg-white px-2 py-1 text-black transition-colors duration-200 hover:bg-gray-200";

const PaginationButtons = ({ onPrev, onNext }) => {
  return (
    <div className="mt-3 flex justify-center gap-2">
      <button onClick={onPrev} className={paginationButtonClass}>
        前へ
      </button>
      <button onClick={onNext} className={paginationButtonClass}>
        次へ
      </button>
    </div>
  );
};

export default PaginationButtons;
