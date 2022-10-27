import {
  Button,
  Container,
  Stack,
  Typography,
  Box,
  Modal,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { BookmarkForm } from "../components/form";

export const HomePage = () => {
  const [modalStatus, setModalStaus] = useState(false);
  const [bookmarks, setBookmarks] = useState({});
  const [detailBookmark, setDetailBookmark] = useState(null);
  const [isNewBookmarkAdded, setIsNewBookmarkAdded] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    setBookmarks(storedBookmarks);
  }, [isNewBookmarkAdded]);

  const handleDetails = (e, bookmark) => {
    e.stopPropagation();
    setDetailBookmark(bookmark);
  };

  const handleAddBookmark = () => {
    setModalStaus(true);
    setIsNewBookmarkAdded(false);
  };

  return (
    <Container>
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Bookmark Manager</Typography>
        <Box>
          <Button variant="outlined" onClick={handleAddBookmark}>
            Add Bookmark
          </Button>
        </Box>
      </Stack>
      <Modal open={modalStatus} onClose={() => setModalStaus(false)}>
        <Box sx={style}>
          <BookmarkForm
            setModalStaus={setModalStaus}
            setIsNewBookmarkAdded={setIsNewBookmarkAdded}
          />
        </Box>
      </Modal>
      <Stack direction="row" alignItems="center">
        <Box
          sx={{
            mt: "2rem",
            width: "60%",
          }}
        >
          {bookmarks &&
            Object.keys(bookmarks).map((category, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 345,
                  mb: "2rem",
                  height: "300px",
                  overflowY: "auto",
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category}
                  </Typography>
                  <List>
                    {bookmarks[category].map((bookmark) => (
                      <Stack direction="row" key={bookmark.title} mb={2}>
                        <ListItemButton
                          component="a"
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ListItemText primary={bookmark.title} />
                        </ListItemButton>
                        <Button
                          variant="contained"
                          onClick={(e) => handleDetails(e, bookmark)}
                        >
                          Details
                        </Button>
                      </Stack>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
        </Box>
        <Box width="500px">
          {detailBookmark && (
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardContent>
                <Typography>Title: {detailBookmark.title}</Typography>
                <Typography>Url: {detailBookmark.url}</Typography>
                <Typography>Category: {detailBookmark.category}</Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Stack>
    </Container>
  );
};
