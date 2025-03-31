const Lead = require("../models/Lead");

exports.getLeadTrends = async (req, res) => {
  try {
    const weekly = await Lead.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    const monthly = await Lead.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    const yearly = await Lead.countDocuments({ createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } });

    res.json({ weekly, monthly, yearly });
  } catch (error) {
    res.status(500).json({ message: "Error fetching lead trends", error });
  }
};
