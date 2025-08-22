    import mongoose from "mongoose";
    import crypto from "crypto";

    const rawKey = process.env.ENCRYPTION_KEY || "default_vault_key_sauce";

        // 🔑 Always derive a 32-byte key from whatever user provides
        const ENCRYPTION_KEY = crypto.createHash("sha256").update(rawKey).digest();
        const IV_LENGTH = 16; 

            function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

function decrypt(text) {
  try {
    const [ivHex, encrypted] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    return "*** decryption failed ***";
  }
}

    const {Schema} = mongoose;

    const PassSchema = new Schema({
            website: {type:String},
            username: {type:String, required:true},
            password: {type:String, required:true},
            dateAdded: {type:Date, default: Date.now},
            createdBy: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "user",
               required: true,
            } 
    });

    //  Encrypt before saving
PassSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = encrypt(this.password);
  }
  next();
});

PassSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.password = decrypt(obj.password);
  delete obj.__v; 
  return obj;
};

    export const Password = mongoose.model('Password',PassSchema);