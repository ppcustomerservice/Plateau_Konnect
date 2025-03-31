import React from "react";
import { Card, CardContent, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    type: "Real Estate Brokers",
    shortDescription: "Market properties, manage clients, and gain market insights with our robust tools.",
    buttonText: "Explore Broker Plans",
    navigateTo: "/brokerplans",
  },
  {
    type: "Real Estate Buyers & Sellers",
    shortDescription: "Find the best deals, detailed property insights, and an effortless browsing experience.",
    buttonText: "Explore Buyer Plans",
    navigateTo: "/buyerplans",
  },
  {
    type: "Builders & Developers",
    shortDescription: "Showcase projects, manage leads, and analyze market demands efficiently.",
    buttonText: "Explore Builder Plans",
    navigateTo: "/builderplans",
  },
  {
    type: "Monetization Features",
    shortDescription: "Maximize revenue with advertising, commissions, and premium services.",
    buttonText: "Explore Monetization Options",
    navigateTo: "/MonetizationPage",
  },
];

const PricingPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <Container>
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 4, color: "#0D47A1" }}>
            Plateau Konnect Plans & Pricing
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Choose the perfect plan to elevate your real estate experience.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ textAlign: "center", p: 4, boxShadow: 4, borderRadius: 4, border: "1px solid #E0E0E0", backgroundColor: "#FFFFFF" }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom color="#0D47A1">
                      {category.type}
                    </Typography>
                    <Typography variant="body1" paragraph color="#616161">
                      {category.shortDescription}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(category.navigateTo)}
                      sx={{ mt: 2, px: 3, backgroundColor: "#0D47A1", '&:hover': { backgroundColor: "#1565C0" } }}
                    >
                      {category.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PricingPlans;
