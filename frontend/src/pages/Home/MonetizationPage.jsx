import React from "react";
import { Card, CardContent, Typography, Button, Grid, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const monetizationFeatures = [
  {
    title: "Advertising & Featured Listings",
    description: "Brokers and builders can pay extra to have their listings featured at the top of search results or highlighted in email campaigns."
  },
  {
    title: "Commission-Based Services",
    description: "For every property sold through the platform, Plateau Konnect could take a small commission, or brokers could pay a small transaction fee for successful sales."
  },
  {
    title: "Custom Services",
    description: "Offering custom branding for brokers, builders, or buyers could be an additional revenue stream."
  },
  {
    title: "Market Insights & Reports",
    description: "Premium market reports could be sold on-demand, providing in-depth trends, forecasts, and investment opportunities."
  }
];

const MonetizationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom color="#FF6F00">
            Monetization Features
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Unlock additional revenue opportunities with Plateau Konnect.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {monetizationFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: "flex" }}>
              <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1 }}>
                <Card sx={{ p: 4, boxShadow: 10, borderRadius: 6, textAlign: "center", height: "100%", background: "#FF6F00", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <CardContent sx={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))", borderRadius: "12px", p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#E65100", px: 6, py: 2, fontSize: "1.2rem", borderRadius: "25px", transition: "all 0.3s", boxShadow: 3, "&:hover": { backgroundColor: "#FF8F00" } }}
              onClick={() => navigate("/sign-in")}
            >
              Learn More
            </Button>
          </motion.div>
        </Box>
      </Container>
    </div>
  );
};

export default MonetizationPage;
