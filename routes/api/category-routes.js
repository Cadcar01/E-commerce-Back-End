const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      includes: [{ model: Product }],
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      includes: [{ model: Product }],
    });
    
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    };
  res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
      const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
    
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, 
    {
      where: {
        id: req.params.id,
      }
    });
    
    if (!updatedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    };
  res.status(200).json(updatedCategory);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    };
  res.status(200).json(deletedCategory);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
