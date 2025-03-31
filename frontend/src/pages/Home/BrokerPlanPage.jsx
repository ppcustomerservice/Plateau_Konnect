import React from "react";
import { Card, CardContent, Typography, Button, Grid, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const brokerPlans = [
  {
    title: "Basic Package",
    features: [
      "✔ Property Listings",
      "✔ Basic CRM Features",
      "✔ Basic Analytics",
      "✔ Messaging Tools",
      "✔ Sales Assistance",
      "✔ Relationship Manager Support"
    ],
  },
  {
    title: "Professional Package",
    features: [
      "✔ Unlimited Listings",
      "✔ Advanced CRM Tools",
      "✔ Detailed Analytics & Market Trends",
      "✔ Direct Communication with Buyers & Builders",
      "✔ Virtual Tour Integration",
      "✔ Marketing Campaigns (Social & Email)",
      "✔ Priority Customer Support"
    ],
  },
  {
    title: "Enterprise Package",
    features: [
      "✔ All Professional Package Features",
      "✔ Advanced Reporting & Market Insights",
      "✔ Team Collaboration Tools",
      "✔ Premium Listing Placement",
      "✔ CRM & API Integration",
      "✔ Dedicated Account Manager",
      "✔ Comprehensive Online Marketing (Google & Social Ads)"
    ],
  },
];

const BrokersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom color="#0D47A1">
            Plateau Konnect - No.1 Platform for Brokers
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Maximize your sales, connect with buyers, and manage your properties effortlessly.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {brokerPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: "flex" }}>
              <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1 }}>
                <Card sx={{ p: 4, boxShadow: 10, borderRadius: 6, textAlign: "center", height: "100%", background: "#1565C0", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0D47A1", px: 6, py: 2, fontSize: "1.2rem", borderRadius: "25px", transition: "all 0.3s", boxShadow: 3, "&:hover": { backgroundColor: "#1565C0" } }}
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

export default BrokersPage;
