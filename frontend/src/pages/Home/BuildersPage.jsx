import React from "react";
import { Card, CardContent, Typography, Button, Grid, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const builderPlans = [
  {
    title: "Starter Package",
    features: [
      "✔ Listing of one or two upcoming projects",
      "✔ Access to lead generation tools",
      "✔ Basic analytics on property demand",
      "✔ Basic project marketing tools",
    ],
  },
  {
    title: "Pro Package",
    features: [
      "✔ Unlimited project listings",
      "✔ Advanced lead generation tools",
      "✔ Enhanced project marketing tools",
      "✔ Advanced market analysis",
      "✔ Virtual staging and virtual tours",
      "✔ Direct communication with brokers and buyers",
      "✔ Discounted advertising options",
    ],
  },
  {
    title: "Enterprise Package",
    features: [
      "✔ Everything in the Pro package",
      "✔ Advanced data analytics",
      "✔ Custom project dashboards",
      "✔ Priority placement in search results",
      "✔ Dedicated account management",
      "✔ White-label branding options",
    ],
  },
];

const BuildersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom color="#D32F2F">
            Plateau Konnect - Builders & Developers Plans
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Showcase your projects, manage leads, and gain market insights effortlessly.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {builderPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: "flex" }}>
              <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1 }}>
                <Card sx={{ p: 4, boxShadow: 10, borderRadius: 6, textAlign: "center", height: "100%", background: "#D32F2F", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <CardContent sx={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))", borderRadius: "12px", p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {plan.title}
                    </Typography>
                    <ul style={{ textAlign: "left", paddingLeft: "20px", listStyle: "none", fontSize: "1rem" }}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} style={{ marginBottom: "8px" }}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: "#B71C1C", "&:hover": { backgroundColor: "#C62828" } }}
                    onClick={() => navigate("/builder-signup")}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#B71C1C", px: 6, py: 2, fontSize: "1.2rem", borderRadius: "25px", transition: "all 0.3s", boxShadow: 3, "&:hover": { backgroundColor: "#C62828" } }}
              onClick={() => window.open("https://www.propertyplateautimes.com/Enquiry", "_blank")}
            >
              Get Started Now
            </Button>
          </motion.div>
        </Box>
      </Container>
    </div>
  );
};

export default BuildersPage;
