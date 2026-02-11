import Service from "../models/Service.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

/* -------------------- Helpers -------------------- */

const parseJsonArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;

  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return field
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
};

const normalizeSlotsToMap = (slotStrings = []) => {
  const map = {};

  slotStrings.forEach((raw) => {
    const m = raw.match(
      /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s*•\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
    );

    if (!m) {
      map.unspecified = map.unspecified || [];
      map.unspecified.push(raw);
      return;
    }

    const [, day, mon, year, hour, min, ampm] = m;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const mm = String(months.indexOf(mon) + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");

    const dateKey = `${year}-${mm}-${dd}`;
    const time = `${hour.padStart(2,"0")}:${min} ${ampm.toUpperCase()}`;

    map[dateKey] = map[dateKey] || [];
    map[dateKey].push(time);
  });

  return map;
};

const sanitizePrice = (v) =>
  Number(String(v ?? "0").replace(/[^\d.-]/g, "")) || 0;

const parseAvailability = (v) => {
  const s = String(v ?? "available").toLowerCase();
  return s === "available" || s === "true";
};

/* -------------------- CREATE -------------------- */

export async function createService(req, res) {
  try {
    const b = req.body || {};

    const service = new Service({
      name: b.name,
      about: b.about || "",
      shortDescription: b.shortDescription || "",
      price: sanitizePrice(b.price),
      available: parseAvailability(b.availability),
      instructions: parseJsonArrayField(b.instructions),
      slots: normalizeSlotsToMap(parseJsonArrayField(b.slots)),
    });

    if (req.file) {
      const up = await uploadToCloudinary(req.file.path, "services");
      service.imageUrl = up.secure_url;
      service.imagePublicId = up.public_id;
    }

    const saved = await service.save();

    res.status(201).json({
      success: true,
      data: saved,
      message: "Service created successfully",
    });
  } catch (err) {
    console.error("createService error:", err);
    res.status(500).json({ success: false, message: "Create failed" });
  }
}

/* -------------------- GET ALL -------------------- */

export async function getService(req, res) {
  try {
    const list = await Service.find()
      .sort({ createdAt: -1 }) // ✅ FIXED
      .lean();

    res.status(200).json({
      success: true,
      list,
    });
  } catch (err) {
    console.error("getService error:", err);
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
}

/* -------------------- GET BY ID -------------------- */

export async function getServiceById(req, res) {
  try {
    const service = await Service.findById(req.params.id).lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (err) {
    console.error("getServiceById error:", err);
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
}

/* -------------------- UPDATE -------------------- */

export async function updateService(req, res) {
  try {
    const existing = await Service.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const b = req.body || {};
    const updateData = {};

    if (b.name !== undefined) updateData.name = b.name;
    if (b.about !== undefined) updateData.about = b.about;
    if (b.shortDescription !== undefined) updateData.shortDescription = b.shortDescription;
    if (b.price !== undefined) updateData.price = sanitizePrice(b.price);
    if (b.availability !== undefined) updateData.available = parseAvailability(b.availability);
    if (b.instructions !== undefined) updateData.instructions = parseJsonArrayField(b.instructions);
    if (b.slots !== undefined) updateData.slots = normalizeSlotsToMap(parseJsonArrayField(b.slots));

    if (req.file) {
      const up = await uploadToCloudinary(req.file.path, "services");
      updateData.imageUrl = up.secure_url;
      updateData.imagePublicId = up.public_id;

      if (existing.imagePublicId) {
        await deleteFromCloudinary(existing.imagePublicId);
      }
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
      message: "Service updated",
    });
  } catch (err) {
    console.error("updateService error:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
}

/* -------------------- DELETE -------------------- */

export async function deleteService(req, res) {
  try {
    const existing = await Service.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (existing.imagePublicId) {
      await deleteFromCloudinary(existing.imagePublicId);
    }

    await existing.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted",
    });
  } catch (err) {
    console.error("deleteService error:", err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
}
