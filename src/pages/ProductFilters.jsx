import { Stack, TextField, MenuItem, InputAdornment, Button, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const categories = ["Fashion", "Electronics", "Home"];
const subcategories = {
    Fashion: ["Men", "Women", "Kids"],
    Electronics: ["Mobiles", "Laptops", "Accessories"],
    Home: ["Furniture", "Decor", "Kitchen"],
};

export default function ProductFilters({
    category,
    setCategory,
    subcategory,
    setSubcategory,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    location,
    setLocation,
    onReset,
    sortBy,
    setSortBy,
}) {
    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 2, md: 3 },
                mb: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #e3f0ff 0%, #f9fafb 100%)",
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
                flexWrap="wrap"
            >
                {/* Category Dropdown */}
                <TextField
                    select
                    label="Category"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setSubcategory("");
                    }}
                    sx={{ minWidth: 140, flex: 1 }}
                    size="small"
                >
                    <MenuItem value="">All</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </TextField>
                {/* Subcategory Dropdown */}
                <TextField
                    select
                    label="Subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    sx={{ minWidth: 140, flex: 1 }}
                    disabled={!category}
                    size="small"
                >
                    <MenuItem value="">All</MenuItem>
                    {category &&
                        subcategories[category]?.map((sub) => (
                            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                        ))}
                </TextField>
                {/* Sorting Dropdown */}
                <TextField
                    select
                    label="Sort By"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ minWidth: 140, flex: 1 }}
                    size="small"
                >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                    <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="oldest">Oldest First</MenuItem>
                </TextField>
                {/* Price and Location */}
                <TextField
                    label="Min Price"
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    sx={{ minWidth: 100, flex: 1 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    size="small"
                />
                <TextField
                    label="Max Price"
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    sx={{ minWidth: 100, flex: 1 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    size="small"
                />
                <TextField
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ minWidth: 140, flex: 1 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onReset}
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    }}
                >
                    Reset
                </Button>
            </Stack>
        </Paper>
    );
}