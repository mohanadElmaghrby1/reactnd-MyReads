import React, { Component } from "react";
import ListBooks from "./ListBooks";

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ListBooks/>
                </div>
            </div>
        );
    }
}

export default BookShelf;