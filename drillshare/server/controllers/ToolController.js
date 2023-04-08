import Tool from '../model/Tool.js';

export const getTool = async (req, res) => {
  //TODO getTool

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const contract = {}; //await Contract.find();
    // res.send({ contract });
    res.send("get function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const getToolCategoryById = async (req, res, next) => {
  console.log("HERE: ", req.query);
  try {
    const category = await Tool.find({'category': req.query.category});
    console.log(category);
    res.send(category);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
}

export const createTool = async (req, res, next) => {
  console.log('tool: ', req.body);
  try {
    //TODO replace with body of req
    const tool = new Tool({
      name: req.body.name,
      category: req.body.category,
      model_num: req.body.model_num,
    });

    console.log(tool);
    await tool.save();
    // res.redirect("/");
    res.send(tool)
    // res.send("Created");
    // res.send("create function incomplete");

  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateTool = async (req, res, next) => {
  try {
    //TODO updateTool

    // find tool
    // const tool = await Tool.find();
    // update with new parameters
    // save tool
    // await tool.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("update function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};
