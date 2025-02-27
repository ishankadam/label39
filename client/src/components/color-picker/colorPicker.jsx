// import React, { useState } from "react";
// import { TextField, Box, IconButton } from "@mui/material";

// const ColorInputComponent = () => {
//   const [color, setColor] = useState("#000000");
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const handleColorChange = (event) => {
//     setColor(event.target.value);
//   };

//   const handleColorPickerChange = (newColor: string) => {
//     setColor(newColor);
//   };

//   const toggleColorPicker = () => {
//     setShowColorPicker(!showColorPicker);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         gap: 2,
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//         <TextField
//           label="Color"
//           value={color}
//           onChange={handleColorChange}
//           sx={{ width: 200 }}
//         />
//         <Box
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: "50%",
//             backgroundColor: color,
//             border: "1px solid #ccc",
//           }}
//         />
//         <IconButton onClick={toggleColorPicker} color="primary">
//           <ColorLensIcon />
//         </IconButton>
//       </Box>
//       {showColorPicker && (
//         <ColorPicker value={color} onChange={handleColorPickerChange} />
//       )}
//     </Box>
//   );
// };

// export default ColorInputComponent;
