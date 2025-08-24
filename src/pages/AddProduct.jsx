import { useState } from "react";
import API from "../services/api";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Stack, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const categories = ["Fashion", "Electronics", "Home"];
const subcategories = {
    Fashion: ["Men", "Women", "Kids"],
    Electronics: ["Mobiles", "Laptops", "Accessories"],
    Home: ["Furniture", "Decor", "Kitchen"],
};

const AddProduct = ({ onClose, onAdded }) => {
    const [form, setForm] = useState({
        title: "",
        category: "",
        subcategory: "",
        price: "",
        location: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setForm({ ...form, category: value, subcategory: "" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/products", form, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            onAdded();
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Error adding product");
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
                    <AddCircleOutlineIcon color="primary" fontSize="large" />
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        Add New Product
                    </Typography>
                </Stack>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Title"
                            name="title"
                            value={form.title}
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
                                value={form.category}
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
                                value={form.subcategory}
                                onChange={handleChange}
                                fullWidth
                                disabled={!form.category}
                                required
                            >
                                <MenuItem value="">Select Subcategory</MenuItem>
                                {form.category &&
                                    subcategories[form.category]?.map((sub) => (
                                        <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                                    ))}
                            </TextField>
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="Price"
                                name="price"
                                type="number"
                                value={form.price}
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
                                value={form.location}
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
                            value={form.description}
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
                        Add Product
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddProduct;