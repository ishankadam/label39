import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import { imageUrl } from "../../api";
import { usePriorityManager } from "../../hooks/usePriorityManager";
import CloseIcon from "@mui/icons-material/Close";

export const PriorityModal = ({
  open,
  onClose,
  items: initialItems,
  fields,
  folder,
  idKey,
  collection,
  setData,
}) => {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const { saveEntities } = usePriorityManager(items);

  const handlePriorityChange = (itemId, newPriority) => {
    const priority = parseInt(newPriority, 10);

    if (!isNaN(priority) && priority > 0) {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) => {
          if (item[idKey] === itemId) {
            return { ...item, priority };
          }

          if (item.priority >= priority) {
            return { ...item, priority: item.priority + 1 };
          }

          return item;
        });

        return updatedItems.sort((a, b) => a.priority - b.priority);
      });

      setEditingId(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveEntities(items, collection, setData);
      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ padding: 2 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Roboto Serif', serif",
            color: "#a16149",
            fontWeight: "600",
            textAlign: { xs: "center", md: "left" },
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.3rem",
              lg: "1.5rem",
            },
          }}
        >
          Update Priorities
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.key}>{field.label}</TableCell>
                ))}
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item[idKey]}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>
                      {field.type === "image" ? (
                        <img
                          src={
                            item[field.key] && item[field.key].length > 0
                              ? `${imageUrl}${folder}/${item[field.key][0]}`
                              : "/placeholder.svg"
                          }
                          alt={item[fields[0].key]}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Typography variant="body1">
                          {item[field.key]}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editingId === item[idKey] ? (
                      <TextField
                        type="number"
                        defaultValue={item.priority}
                        size="small"
                        onBlur={(e) =>
                          handlePriorityChange(item[idKey], e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handlePriorityChange(item[idKey], e.target.value);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <Button
                        sx={{
                          border: "1px solid #a16149",
                        }}
                        color="#a16149"
                        variant="outlined"
                        size="small"
                        onClick={() => setEditingId(item[idKey])}
                      >
                        {item.priority}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="custom"
          variant="outlined"
          sx={{ width: "200px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="custom"
          variant="contained"
          sx={{ width: "200px" }}
          disabled={isSaving}
        >
          {isSaving ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
