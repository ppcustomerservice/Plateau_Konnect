import React from "react";
import { Card, CardContent, Typography, Button, Grid, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { color, motion } from "framer-motion";

const buyerPlans = [
  {
    title: "Basic Package (Free)",
    features: [
      "✔ Search & Filter Properties by Location, Price, Features",
      "✔ Save & Compare Properties",
      "✔ Basic Market Insights (Price Trends)",
      "✔ Request Property Info or Book Viewings",
    ],
  },
  {
    title: "Premium Package",
    features: [
      "✔ Unlimited Property Searches & Priority Access to New Listings",
      "✔ Virtual Tours of Properties",
      "✔ Personalized Property Recommendations",
      "✔ Real-time Market Data & Price Forecasts",
      "✔ Priority Booking for Viewings",
      "✔ Exclusive Off-market Property Alerts",
      "✔ Direct Communication with Brokers & Builders",
    ],
  },
];

const BuyersPlanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom color="#0D47A1">
            Plateau Konnect - No.1 Platform for Buyers & Sellers
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Find the best deals, explore detailed insights, and get priority access to properties.
          </Typography>
        </motion.div>

        {/* Sign In Button (Aligned to Right) */}
        <Box display="flex" justifyContent="flex-end" my={2}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#0D47A1", // Background color always applied
      color: "#fff", // Text color always white
      "&:hover": {
        backgroundColor: "#0B3D91", // Darker shade on hover
      },
    }}
    onClick={() => navigate("/sign-in")}
  >
    Sign In
  </Button>
</Box>


        <Grid container spacing={4} justifyContent="center" mt={2}>
          {buyerPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: "flex" }}>
              <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1 }}>
                <Card
                  sx={{
                    p: 4,
                    boxShadow: 10,
                    borderRadius: 6,
                    textAlign: "center",
                    height: "100%",
                    background: "#1565C0",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent
                    sx={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
                      borderRadius: "12px",
                      p: 3,
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {plan.title}
                    </Typography>
                    <ul style={{ textAlign: "left", paddingLeft: "20px", listStyle: "none", fontSize: "1rem" }}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} style={{ marginBottom: "8px" }}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#0D47A1",
                        px: 4,
                        py: 1,
                        fontSize: "1rem",
                        borderRadius: "20px",
                        boxShadow: 2,
                        "&:hover": { backgroundColor: "#0B3D91" },
                      }}
                      onClick={() => window.open("https://www.propertyplateautimes.com/Enquiry", "_blank")}
                    >
                      To Know More 
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default BuyersPlanPage;
