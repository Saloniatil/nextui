"use client"
import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent'; // Assuming
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Switch from "@mui/material/Switch";
import Add from '@mui/icons-material/Add';
 export default function About () {
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  );

  let [users, setUsers] = useState([])
   
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState({
    srno: "",
    name: "",
    registrationno: "",
    state: "",
    city: "",
    // status: "",
    contactno: "",
    details: ""  
  })
   
  const [open, setOpen] = React.useState<boolean>(false);
   const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };
  const [responseData, setResponseData] = useState<any>([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    const formData = new FormData();
    formData.append("srno", data.srno);
    formData.append("name", data.name);
    formData.append("registrationno", data.registrationno);
    formData.append("state", data.state);
    formData.append("city", data.city);
    // formData.append("status", data.status);
    formData.append("contactno", data.contactno);
    formData.append("details", data.details);
    axios.post("http://localhost:8082/post", data)

    .then((result) => {
      if (result.status === 200) {
        console.log("Success");
        setResponseData(result.data); ///Update the state with the response data
        router.push('/dashboard/retailor');
        handleClose();
      }
    })
    .catch((err) => console.log(err));
};

   return (
    <>
     <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
     Update
      </Button>
      {/* <Modal open={open} onClose={(handleClose) => setOpen(false)}> */}
      <Modal open={open} onClose={handleClose}>
          <ModalDialog>
            <DialogTitle>Create new project</DialogTitle>
            <DialogContent>
              Fill in the information of the project.
            </DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <FormControl
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Srno:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, srno: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Name:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, name: e.target.value })
                            }
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>RegistrationNo:</FormLabel>
                          <Input
                            autoFocus
                            required
                            onChange={(e) =>
                              setData({ ...data, registrationno: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>State:</FormLabel>
                          <Input
                            autoFocus
                            required
                            onChange={(e) =>
                              setData({ ...data, state: e.target.value })
                            }
                          />
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>City:</FormLabel>
                          <Input
                            autoFocus
                            required
                            onChange={(e) =>
                              setData({ ...data, city: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Status:</FormLabel>
                        Active:
                        <Switch {...FormLabel} defaultChecked />
                        Deactive:
                        <Switch {...FormLabel}  defaultChecked/>
                           
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Contactno</FormLabel>
                          <Input
                            autoFocus
                            required
                            type="text"
                            className="form-control rounded-0"
                            onChange={(e) =>
                              setData({ ...data, contactno: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Details</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="text"
                            className="form-control rounded-0"
                            onChange={(e) =>
                              setData({ ...data, details: e.target.value })
                            }
                          />
                        </div>
                      </div> 
                    </div>
                  </div> 
                   
                </FormControl>

                <Button  type="submit" >Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      
    </React.Fragment>
     
  </>
   )
 }