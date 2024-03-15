import { useCardModal } from "@/store/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const { onOpen } = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => onOpen(data.id)}
          className={`truncate rounded-md border-2 border-transparent ${data.primaryColor} ${data.secondaryColor}
                px-3 py-2 text-sm shadow-sm hover:border-black
                `}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
