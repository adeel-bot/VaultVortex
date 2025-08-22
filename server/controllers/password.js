import { Password } from '../models/Password.js';
// Get request to enquire all the saved records
 export async function getPasswords (req,res){
        try{
                const passes = await Password.find({ createdBy: req.user._id});
                res.json(passes);
        }
        catch(err){
          res.status(500).json({ error: err.message });
        }
}

//Post request to save a record
 export async function setPasswords (req,res){
            try{
                
                    const newPass = new Password({
                        ...req.body,
                        createdBy: req.user._id,
                });
                    await newPass.save();
                    res.status(201).json(newPass.toJSON());
            }
            catch(err){
              res.status(500).json({ error: err.message });
            }
}

//Put request to update some data

export async function updatePassword(req, res) {
  try {
    const { id } = req.params;

    const editedPass = await Password.findOne({ _id: id, createdBy: req.user._id });
    if (!editedPass) {
      return res.status(404).json({ message: "Password not found or unauthorized" });
    }

    if (req.body.website !== undefined) editedPass.website = req.body.website;
    if (req.body.username !== undefined) editedPass.username = req.body.username;
    if (req.body.password !== undefined) editedPass.password = req.body.password;

    await editedPass.save();
    res.json(editedPass.toJSON());

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function deletePassword(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Password.findOneAndDelete({ _id: id, createdBy: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: "Password not found or unauthorized" });
    }

    res.json({ message: "Deleted successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
