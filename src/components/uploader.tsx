import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { DropzoneComponent } from "react-dropzone-component";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import swal from "sweetalert";
import { uploadDocumentService } from "../services/album";

const ReactDOMServer = require("react-dom/server");
const componentConfig = {
  iconFiletypes: [".jpg", ".png", ".gif"],
  showFiletypeIcon: true,
  postUrl: "no-url",
};
const djsConfig = {
  autoProcessQueue: false,
  dictDefaultMessage: " ",

  thumbnailHeight: 100,
  maxFilesize: 2,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{" "}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container border-0">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {" "}
            <span data-dz-name />{" "}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div>
            <a href="#/" className="remove text-center" data-dz-remove>
              {" "}
              <DeleteIcon />{" "}
            </a>
          </div>
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
    </div>
  ),
  headers: { "My-Awesome-Header": "header value" },
};

const UploadModal = ({ modal, toggle }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [album, setAlbum] = useState<string>("Travel");

  const uploader = async () => {
    toggle(false);
    swal({
      title: "Uploading...",
      text: "Please wait",
      closeOnClickOutside: false,
      closeOnEsc: false,
      button: false,
      className: "swal",
    });
    try {
      const response = await uploadDocumentService({
        album: album,
        files: files,
      });
      if (response?.status === 200)
        swal("Good job!", "Photo(s) uploaded successfully", {
          className: "swal",
        }).then(() => {
          window.location.reload();
        });
      else {
        swal("Error!", response?.data?.message ?? "Error Encountered", {
          className: "swal",
        });
      }
    } catch (e) {
      swal("Error!", e.message, { className: "swal" });
    }
  };
  const eventHandlers = {
    addedfile: (file: File) => {
      let temp = files;
      temp.push(file);
      setFiles(temp);
    },
  };

  return (
    <>
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop
        onClosed={() => setFiles([])}
        className="modal-bg"
      >
        <ModalHeader className="modal-bg" toggle={() => toggle(false)}>
          Upload Photos
        </ModalHeader>
        <ModalBody className="modal-bg">
          <DropzoneComponent
            className="dropzone"
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          >
            <div className="text-center child">
              <CloudUploadIcon />
              <p>Drag and drop an image or click here to select</p>
            </div>
          </DropzoneComponent>
          <div className="form-group mt-3">
            <label>Album</label>
            <select
              className="form-control"
              id="album"
              onChange={(e) => setAlbum(e.target.value)}
            >
              <option selected>Travel</option>
              <option>Food</option>
              <option>Personal</option>
              <option>Nature</option>
              <option>Other</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter className="modal-bg">
          <div className="">
            <Button color="primary" onClick={uploader}>
              <CloudUploadIcon />
              &nbsp;upload
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UploadModal;
