import { useState, useEffect } from "react";
import API from "../services/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";

const categories = ["Fashion", "Electronics", "Home"];
const subcategories = {
  Fashion: ["Men", "Women", "Kids"],
  Electronics: ["Mobiles", "Laptops", "Accessories"],
  Home: ["Furniture", "Decor", "Kitchen"],
};

const EditProduct = ({ product, onClose, onUpdated }) => {
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData({ ...formData, category: value, subcategory: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${formData._id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onUpdated();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
      sx: {
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        background: "linear-gradient(135deg, #e3f0ff 0%, #f9fafb 100%)",
      }
    }}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EditIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="bold" color="primary">
            Edit Product
          </Typography>
        </Stack>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <CategoryIcon color="action" sx={{ mr: 1 }} />
                ),
              }}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Subcategory"
                name="subcategory"
                value={formData.subcategory || ""}
                onChange={handleChange}
                fullWidth
                disabled={!formData.category}
                required
              >
                <MenuItem value="">Select Subcategory</MenuItem>
                {formData.category &&
                  subcategories[formData.category]?.map((sub) => (
                    <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                  ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                fullWidth
                required
              />
            </Stack>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description || ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProduct;