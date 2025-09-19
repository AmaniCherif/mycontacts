const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const requireAuth = require("../middlewares/requireAuth");

/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: Contacts CRUD
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-généré du contact
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phone:
 *           type: string
 *           description: Numéro de téléphone (10–20 caractères)
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les contacts d’un utilisateur
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact créé
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      phone,
      user: req.user.id
    });
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   patch:
 *     summary: Modifier un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *       404:
 *         description: Contact introuvable
 */
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé
 *       404:
 *         description: Contact introuvable
 */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json({ msg: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
