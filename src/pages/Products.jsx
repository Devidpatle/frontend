import { useEffect, useState } from "react";
import API from "../services/api";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ProductFilters from "./ProductFilters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);

  // Filter states
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Extract fetch logic into reusable function
  const fetchProducts = async () => {
    let sort = "createdAt:desc";
    if (sortBy === "priceAsc") sort = "price:asc";
    if (sortBy === "priceDesc") sort = "price:desc";
    if (sortBy === "newest") sort = "createdAt:desc";
    if (sortBy === "oldest") sort = "createdAt:asc";

    const params = {
      category,
      subcategory,
      location,
      minPrice: priceMin,
      maxPrice: priceMax,
      sort,
    };

    try {
      const { data } = await API.get("/products", { 
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProducts(data.items);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch products when filters or sort change
  useEffect(() => {
    fetchProducts();
  }, [category, subcategory, priceMin, priceMax, location, sortBy]);

  const handleResetFilters = () => {
    setCategory("");
    setSubcategory("");
    setPriceMin("");
    setPriceMax("");
    setLocation("");
    setSortBy("");
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts(); // Use the reusable function
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f0ff 0%, #f9fafb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: { xs: 2, md: 6 },
        px: { xs: 1, md: 0 },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "1200px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          borderRadius: 4,
          background: "rgba(255,255,255,0.98)",
        }}
      >
        <CardContent>
          {/* Quotes with icons */}
          {user?.role === "user" && (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
              <EmojiObjectsIcon color="secondary" fontSize="medium" />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ fontStyle: "italic", textAlign: "center", fontWeight: 500 }}
              >
                "Welcome! Discover amazing products tailored just for you."
              </Typography>
            </Stack>
          )}
          {user?.role === "merchant" && (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
              <StorefrontIcon color="primary" fontSize="medium" />
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ fontStyle: "italic", textAlign: "center", fontWeight: 500 }}
              >
                "Manage your products efficiently and grow your business!"
              </Typography>
            </Stack>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={4}
            spacing={2}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#1976d2" style={{ marginRight: 8 }}>
                <path d="M7 18c-1.104 0-2-.896-2-2V7c0-1.104.896-2 2-2h10c1.104 0 2 .896 2 2v9c0 1.104-.896 2-2 2H7zm0-2h10V7H7v9zm-2 2c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-1H5v1z" />
              </svg>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                sx={{
                  letterSpacing: 1,
                  textShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                Products
              </Typography>
            </Stack>
            {user?.role === "merchant" && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                }}
                onClick={() => setAddingProduct(true)}
              >
                + Add Product
              </Button>
            )}
          </Stack>

          {/* Filter Section */}
          {user?.role === "user" && (
            <ProductFilters
              category={category}
              setCategory={setCategory}
              subcategory={subcategory}
              setSubcategory={setSubcategory}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              location={location}
              setLocation={setLocation}
              onReset={handleResetFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          )}

          {/* Product Table */}
          {products.length === 0 ? (
            <Typography align="center" color="textSecondary" sx={{ mt: 6 }}>
              No products found
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                background: "#f9fafb",
                overflowX: "auto",
                maxHeight: { xs: 400, md: 600 },
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ background: "#e3eafc" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Subcategory</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                    {user?.role === "merchant" && (
                      <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p, idx) => (
                    <TableRow
                      key={p._id}
                      hover
                      sx={{
                        background: idx % 2 === 0 ? "#f5f7fa" : "#e9f0fb",
                        transition: "background 0.2s",
                        "&:hover": { background: "#dbeafe" },
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight="bold" color="primary">
                          {p.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{p.category}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{p.subcategory}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.5,
                            py: 0.5,
                            bgcolor: "#e0f7fa",
                            color: "#00838f",
                            borderRadius: 2,
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          ${p.price}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{p.location}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: 180,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {p.description}
                        </Typography>
                      </TableCell>
                      {user?.role === "merchant" && (
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              color="info"
                              size="small"
                              sx={{
                                borderRadius: 2,
                                minWidth: 0,
                                px: 1,
                                py: 0.5,
                                fontWeight: "bold",
                                textTransform: "none",
                              }}
                              onClick={() => setEditingProduct(p)}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{
                                borderRadius: 2,
                                minWidth: 0,
                                px: 1,
                                py: 0.5,
                                fontWeight: "bold",
                                textTransform: "none",
                              }}
                              onClick={() => handleDeleteProduct(p._id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {addingProduct && (
        <AddProduct 
          onClose={() => setAddingProduct(false)} 
          onAdded={fetchProducts} 
        />
      )}

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={fetchProducts}
        />
      )}
    </Box>
  );
}
