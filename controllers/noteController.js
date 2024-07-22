const Note = require("../models/noteModel");
// const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// const addNote = async(req,res) => {
//     const {title,content,tags} = req.body;
//     const {user} = req.user

//     if(!title) {
//         res.status(400).json({message:"Title is Required"});
//     }
//     if(!content) {
//         res.status(400).json({message:"Content is Required"});
//     }
//     try {
//         const note = new Note({
//             title,
//             content,
//             tags:tags || [],
//             userId:user._id
//         })
//         await note.save();
//         return res.status(200).json({message:"Note Add Successfully",note});
//     } catch (error) {
//         return res.status(400).json({message:"Internal Server Error"})
//     }

// }

//Add Note
const addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (!title) {
      res.status(400).json({ message: "Title is Required" });
    }
    if (!content) {
      res.status(400).json({ message: "Content is Required" });
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      user: user._id,
    });
    await note.save()
    // const savedNote = await note.save();
    // user.note.push(savedNote)
    // await user.save()
    return res.status(200).json({ message: "Note Add Successfully", note })
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

//Edit Note
const editNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const {title,content,tags,isPinned} = req.body;
    // const user = await User.findById(req.userId);
    
    if(!title && !content && !tags) {
        return res.status(400).json({ message: "No Changes Provided" });
    }
    // const note = await Note.findOne({_id:noteId,userId:user._id});
    const note = await Note.findOne({_id:noteId});
    if(!note) {
        return res.status(400).json({ message: "Note Not Found" });
    }
    if(title) {
        note.title = title;
    }
    if(content) {
        note.content = content;
    }
    if(tags) {
        note.tags = tags;
    }
    if(isPinned) {
        note.isPinned = isPinned;
    }

    await note.save();


    return res.status(200).json({ message: "Note Updated Successfully", note});
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

//Get All Notes
const getAllNotes = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // const notes = await Note.find({userId:user._id}).sort({ispinned:1});
    const notes = await Note.find({});

    return res.status(200).json({ message: "All Notes Retrieved Successfully", notes});
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
};


//Delete Note
const deleteNote = async (req, res) => {
    try {
      const noteId = req.params.noteId;
    //   const user = await Note.findById(req.userId);
      const note = await Note.findOne({_id:noteId});

      if(!note) {
        return res.status(400).json({ message: "Note Not Found" });
      }
      await Note.deleteOne({_id:noteId});
  
  
      return res.status(200).json({ message: "Note Deleted Successfully", note});
    } catch (error) {
      return res.status(400).json({ message: "Internal Server Error" });
    }
  };

  const editIsPinned = async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const {isPinned} = req.body;
      // const user = await User.findById(req.userId);
      
      // const note = await Note.findOne({_id:noteId,userId:user._id});
      const note = await Note.findOne({_id:noteId});
      if(!note) {
          return res.status(400).json({ message: "Note Not Found" });
      }
      if(isPinned) {
          note.isPinned = isPinned ;
      }
  
      await note.save();
  
  
      return res.status(200).json({ message: "isPinned Updated Successfully", note});
    } catch (error) {
      return res.status(400).json({ message: "Internal Server Error" })
    }
  };
module.exports = { addNote,editNote ,getAllNotes,deleteNote ,editIsPinned}
