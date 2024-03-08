"use client";

import { ListWithCards } from "@/types";
import { memo, useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/server/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/server/actions/update-card-order";
import { ListItem } from "./list-item";
import { ListForm } from "./list-form";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
  orgId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ boardId, data, orgId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => toast.success("List reordered"),
    onError: (error) => toast.error(error),
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => toast.success("Card reordered"),
    onError: (error) => toast.error(error),
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //if dropped in same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // user moves list

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId, orgId });
    }

    // user moves card

    if (type === "card") {
      let newOrderedData = [...orderedData];

      // source and destination list

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destinationList) {
        return;
      }

      // check if cards exits on sourcelist

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // check if cards exits on destination list

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // moving the card in the same list

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          items: reorderedCards,
          boardId,
          orgId,
        });
      } else {
        // moves the card to another list

        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        //update the order for each card in the destination list

        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          items: destinationList.cards,
          boardId,
          orgId,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                  orgId={orgId}
                />
              );
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(ListContainer);
