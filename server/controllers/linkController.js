import Link from "../models/link.js";

// ✅ Add single link
export const addLink = async (req, res) => {
  try {
    const { title, url } = req.body;
    const newLink = await Link.create({
      title,
      url,
      user: req.user._id
    });

    res.status(201).json({ message: "Link added successfully", link: newLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add multiple links at once
export const addMultipleLinks = async (req, res) => {
  try {
    const { links } = req.body;
    if (!Array.isArray(links) || links.length === 0) {
      return res.status(400).json({ message: "Please provide at least one link." });
    }

    const formattedLinks = links.map(link => ({
      title: link.title,
      url: link.url,
      user: req.user._id
    }));

    const savedLinks = await Link.insertMany(formattedLinks);

    res.status(201).json({
      message: `${savedLinks.length} links added successfully`,
      links: savedLinks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all links of logged-in user
export const getMyLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a link
export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const updatedLink = await Link.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, url },
      { new: true }
    );

    if (!updatedLink) return res.status(404).json({ message: "Link not found or unauthorized" });
    res.json({ message: "Link updated successfully", link: updatedLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a link
export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLink = await Link.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedLink) return res.status(404).json({ message: "Link not found or unauthorized" });
    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
