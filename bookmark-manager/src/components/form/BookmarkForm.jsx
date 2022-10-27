import { Stack, Button, Typography, Box, IconButton } from "@mui/material";
import { Form, Field } from "react-final-form";
import React from "react";
import { Input } from "../";
import { ValidationUtil } from "../../utils";
import { useEffect } from "react";
import { useState } from "react";
import { AutoCompleteSelect } from "../Input";
import AddIcon from "@mui/icons-material/Add";

export const BookmarkForm = ({ setModalStaus, setIsNewBookmarkAdded }) => {
  const [categories, setCategories] = useState([]);

  const [isNewCategory, setIsNewCategory] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const onSubmit = async (values) => {
    let storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    storedBookmarks[values.category].push({ ...values });
    localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));
    setIsNewBookmarkAdded(true);
    setModalStaus(false);
  };

  useEffect(() => {
    let storedCategories = JSON.parse(localStorage.getItem("categories"));
    let storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (!storedCategories) {
      localStorage.setItem(
        "categories",
        JSON.stringify(["Programming", "Entertainment"])
      );
    }
    setCategories(storedCategories);
    if (!storedBookmarks) {
      localStorage.setItem(
        "bookmarks",
        JSON.stringify({ Programming: [], Entertainment: [] })
      );
    }
  }, []);

  const handleCategory = (values) => {
    const { category } = values;
    if (category) {
      let storedCategories = JSON.parse(localStorage.getItem("categories"));
      storedCategories.push(category);
      localStorage.setItem("categories", JSON.stringify(storedCategories));
      setCategories(storedCategories);
      let storedBookMarks = JSON.parse(localStorage.getItem("bookmarks"));
      storedBookMarks[category] = [];
      localStorage.setItem("bookmarks", JSON.stringify(storedBookMarks));
    }
    setIsNewCategory(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Typography fontSize="1.5rem" mb={3}>
            Add Bookmark
          </Typography>
          <Stack spacing={2}>
            <Field
              name="title"
              component={Input}
              label="Title"
              placeholder="Title"
              validate={ValidationUtil.requiredValidator}
            />
            <Field
              name="url"
              component={Input}
              label="Url"
              placeholder="Url"
              validate={ValidationUtil.composeValidators(
                ValidationUtil.requiredValidator,
                ValidationUtil.urlValidator
              )}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <Box flexGrow={1}>
                {isNewCategory ? (
                  <Field
                    name="category"
                    component={Input}
                    label="category"
                    validate={ValidationUtil.requiredValidator}
                    sx={{ width: "100%" }}
                  />
                ) : (
                  <Field
                    name="category"
                    component={AutoCompleteSelect}
                    label="category"
                    options={categories}
                    handleOnChange={(value) => setSelectedCategory(value)}
                    value={selectedCategory}
                    defaultValue={selectedCategory}
                    validate={ValidationUtil.requiredValidator}
                  />
                )}
              </Box>
              <Box>
                {isNewCategory ? (
                  <Button
                    variant="contained"
                    onClick={() => handleCategory(values)}
                  >
                    Add
                  </Button>
                ) : (
                  <IconButton
                    size="large"
                    sx={{ border: "1px solid black", borderRadius: 0 }}
                    onClick={() => setIsNewCategory(true)}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Box>
            </Stack>
          </Stack>
          <Stack direction="row" mt={2} justifyContent="space-between">
            <Button
              variant="contained"
              color="success"
              onClick={() => setModalStaus(false)}
            >
              Cancle
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      )}
    />
  );
};
