import { useState, useCallback, useMemo } from "react";
import { updateProductPriorities } from "../api";

export function usePriorityManager(initialEntities) {
  const [entities, setEntities] = useState(initialEntities);

  const sortedEntities = useMemo(() => {
    return [...entities].sort((a, b) => a.priority - b.priority);
  }, [entities]);

  const updatePriority = useCallback((entityId, newPriority) => {
    setEntities((prevEntities) => {
      const updatedEntities = prevEntities.map((entity) => {
        if (entity.id === entityId) {
          return { ...entity, priority: newPriority };
        }
        if (entity.priority >= newPriority && entity.id !== entityId) {
          return { ...entity, priority: entity.priority + 1 };
        }
        return entity;
      });
      return updatedEntities.sort((a, b) => a.priority - b.priority);
    });
  }, []);

  const saveEntities = useCallback(async (items, collection, setData) => {
    try {
      if (collection === "products") {
        await updateProductPriorities({
          products: items,
          setProducts: setData,
        });
      }
    } catch (error) {
      console.error("Error saving entities:", error);
      throw error; // Propagate the error so it can be handled by calling code
    }
  }, []);

  return { entities: sortedEntities, updatePriority, saveEntities };
}
