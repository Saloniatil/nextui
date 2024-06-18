"use client"
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Add from '@mui/icons-material/Add';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MdBuild  } from "react-icons/md"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SendIcon from '@mui/icons-material/Send';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ModalClose from '@mui/joy/ModalClose';
import Link from 'next/link';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ModalOverflow from '@mui/joy/ModalOverflow';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import Switch from "@mui/material/Switch";
import { Country, State, City } from "country-state-city";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { userContext } from './_app';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 
export default function About() {
  // let [users, setUsers] = useState([])
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(undefined,
 );
  const [scroll, setScroll] = React.useState<boolean>(true);

  const [data, setData] = useState({
    regno: "",
    GST_no: "",
    TIN_no: "",
    PAN: "",
    shop_photo: "",
    owner_name: "",
    contact: "",
    mobile: "",
    web: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin: "",
    document_reg_no: "",
    docpan: "",
    terms_and_conditions: "",
    password: ""
  })
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
   

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryList = await Country.getAllCountries();
        setCountries(countryList);
      } catch (err) {
        console.log(err);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    // Fetch list of states when selected country changes
    const loadStates = async () => {
      try {
        const stateList = await State.getStatesOfCountry(selectedCountry);
        setStates(stateList);
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedCountry) {
      loadStates();
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch list of cities when selected state changes
    const loadCities = async () => {
      try {
        const cityList = await City.getCitiesOfState(selectedState);
        setCities(cityList);
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedState) {
      loadCities();
    } else {
      setCities([]);
    }
  }, [selectedState]);

  // Event handlers for country and state selection
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(""); // Reset selected state when country changes
    setSelectedCity(""); // Reset selected city when country changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
///City and State Api/////////
  useEffect(() => {
    const getAllStates = async () => {
      try {
        const states = await State.getStatesOfCountry('IN'); // 'IN' is the country code for India
        setStates(states);
      } catch (err) {
        console.log(err);
      }
    };
    getAllStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setData({ ...data, state: selectedState });

    if (selectedState) {
      const countryCode = 'IN';
      try {
        const stateCities = City.getCitiesOfState(countryCode, selectedState);
        setCities(stateCities);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCities([]);
    }
  };

  const [open, setOpen] = React.useState<boolean>(false);
   const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };
  const [responseData, setResponseData] = useState<any>([]);
  const [description, setDescription] = useState<any>([]);
  const user = useContext(userContext)
  const regno = data.regno;
  const [modalData, setModalData] = useState<any>([]);

  
  useEffect(() => {
   axios.get("http://localhost:8083/get/api/retailor")
   .then((result) => {
     console.log(result)
    if (result.data.Status) {
      setResponseData(result.data.Result);
      console.log(result.data.Result,"resultsaurabh")
    } else {
      alert(result.data.Error);
    }
   })
    .catch((err) => console.log(err));
}, [])

useEffect(() => {
  axios.get("http://localhost:8083/getretailor/:regno")
  .then((result) => {
    console.log(result)
    if (result.data.Status) {
      setDescription(result.data.Result);
      console.log(result.data.Result, "Saloni")
    } else {
      alert(result.data.Error);
    }
  })
  .catch((err) => console.log(err));
}, [])

   
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(data)
    const formData = new FormData();
    formData.append("regno", data.regno);
    formData.append("GST_no", data.GST_no);
    formData.append("TIN_no", data.TIN_no);
    formData.append("PAN", data.PAN);
    formData.append("owner_name", data.owner_name);
    formData.append("contact", data.contact);
    formData.append("mobile", data.mobile);
    formData.append("web", data.web);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("pin", data.pin);
    formData.append("document_reg_no", data.document_reg_no);
    formData.append("docpan", data.docpan);
    formData.append("terms_and_conditions", data.terms_and_conditions);
    formData.append("password", data.password);
    formData.append("shop_photo", data.shop_photo);
    axios.post("http://localhost:8083/api/post/retailor", formData)
    .then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
};


const handleDelete = (regno) => {
  axios.delete(`http:localhost:8083/api/delete/retailore/:regno`)
    .then(result => {
      if(result.data.Status) {
        // Reload the page or update the data
        window.location.reload();
      } else {
        alert(result.data.Error);
      }
    })
    .catch(error => {
      console.error('Error deleting data:', error);
    });
}

const label = { inputProps: { "aria-label": "Switch demo " } }

//   const [variant, setVariant] = React.useState<
//   ModalDialogProps['variant'] | undefined
// >(undefined);

    return ( 
      // <userContext.Provider value={{ responseData, handleDelete }}>
      //   useContext(userContext);
      <div> 
         <React.Fragment>
      <Stack direction="row" spacing={1}>
      <Button variant="outlined" color="neutral" onClick={() => {   setLayout('center'); }}> + Add Retailor</Button>
      </Stack>
      <Modal open={!!layout} onClose={() => {  setLayout(undefined);}}>
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout}>
            <ModalClose />
            <Typography id="modal-dialog-overflow" level="h2">  Rerailor Details</Typography>
            <form onSubmit={handleSubmit}>
            <Stack spacing={1}>
            <FormControl
              orientation="horizontal"
              sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}
            >
            </FormControl>
            <FormControl
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Registration No:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, regno: e.target.value })
                            } />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>GST Number:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, GST_no: e.target.value })
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
                          <FormLabel>TIN Number:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, TIN_no: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>PAN Number:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, PAN: e.target.value })
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
                          <FormLabel>Owner name:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, owner_name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Contact:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, contact: e.target.value })
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
                          <FormLabel>Mobile:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, mobile: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Website:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="www.xyz.com"
                            onChange={(e) =>
                              setData({ ...data,  web: e.target.value })
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
                          <FormLabel>Email:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="abc@gmail.com"
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Address:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data,  address: e.target.value })
                            }
                          />
                        </div>
                      </div>{" "}
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Docpan:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data,  docpan: e.target.value })
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
                          <FormLabel>Country:</FormLabel>   
                          <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                           <option key={country.isoCode} value={country.isoCode}>
                             {country.name}
                             </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>State:</FormLabel>
                          <select className="form-select" id="inputState" value={data.state} onChange={handleStateChange} >
                      <option value="">Select state</option>
                     {states.map((item, index) => (
                     <option key={index} value={item.isoCode}>
                     {item.name}
                    </option>
                    ))}
                    </select>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>City:</FormLabel>
                          <select className="form-select" id="inputCity" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} >
              <option value="">Select city</option>
              {cities.map((item, index) => (
                <option key={index} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Pincode:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, pin: e.target.value })
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
                          <FormLabel>Document Registration No:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, document_reg_no: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel> Terms_& Conditions </FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data,  terms_and_conditions: e.target.value })
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
                          <FormLabel>Shop Image:</FormLabel>
                          <Input
                            autoFocus
                            required
                            type="file"
                            className="form-control rounded-0"
                            name="image"
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, shop_photo: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Password:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, password: e.target.value })
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
                          <FormLabel>Status:</FormLabel>
                          Active:
                        <Switch {...FormLabel} defaultChecked />
                        Deactive:
                        <Switch {...FormLabel}  defaultChecked/>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </FormControl>
                <Button  type="submit" >Submit</Button>
                </Stack>
                </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment> 
        <div className="px-5 mt-3">
        <div className='d-flex justify-content-center'>
          <h2>Retailore List</h2>
          {/* <Link></Link> */}
          <div className='mt-3'>
            <table className='table-dark'>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
             <TableRow>
             <StyledTableCell align="center">Registration No</StyledTableCell>
             <StyledTableCell align="center">Owner_name</StyledTableCell>
             <StyledTableCell align="center">Shop_Image</StyledTableCell>
             <StyledTableCell align="center">Website</StyledTableCell>
             <StyledTableCell align="center">Contact</StyledTableCell>
             <StyledTableCell align="center">Email</StyledTableCell>
             <StyledTableCell align="center">Address</StyledTableCell>
             <StyledTableCell>State</StyledTableCell>
             <StyledTableCell align="center">City</StyledTableCell>
             <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((data) => (
            <StyledTableRow key={data.name}>
              <StyledTableCell component="th" scope="row">
              {data.regno}
              </StyledTableCell>
              <StyledTableCell align="right">{data.owner_name}</StyledTableCell>
              <StyledTableCell align="right"><img  src={data.shop_photo} className='user_image' style={{ maxWidth: '100px', maxHeight: '100px' }}/></StyledTableCell>
              <StyledTableCell align="right">{data.web}</StyledTableCell>
              <StyledTableCell align="right">{data.contact}</StyledTableCell>
              <StyledTableCell align="right">{data.email}</StyledTableCell>
              <StyledTableCell align="right">{data.address}</StyledTableCell>
              <StyledTableCell align="right">{data.state}</StyledTableCell>
              <StyledTableCell align="right">{data.city}</StyledTableCell>
              {/* applyin Modal here  for update and view*/}
              <StyledTableCell align="right"> 
              <React.Fragment>
      <Stack direction="row" spacing={1}>
      <Button  onClick={() => {   setLayout('center'); }}>  < ModeEditRoundedIcon /></Button> </Stack>
      <Modal open={!!layout} onClose={() => {  setLayout(undefined);}}>
        <ModalOverflow>  <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout}> <ModalClose />
            <Typography id="modal-dialog-overflow" level="h2">Update</Typography>
            <form onSubmit={handleSubmit}><Stack spacing={1}>
            <FormControl orientation="horizontal" sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}> </FormControl>
            <FormControl style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Registration No:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, regno: e.target.value })
                            } />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>GST Number:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, GST_no: e.target.value })
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
                          <FormLabel>TIN Number:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, TIN_no: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>PAN Number:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, PAN: e.target.value })
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
                          <FormLabel>Owner name:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, owner_name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Contact:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, contact: e.target.value })
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
                          <FormLabel>Mobile:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, mobile: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Website:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="www.xyz.com"
                            onChange={(e) =>
                              setData({ ...data,  web: e.target.value })
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
                          <FormLabel>Email:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="abc@gmail.com"
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Address:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data,  address: e.target.value })
                            }
                          />
                        </div>
                      </div>{" "}
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Docpan:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data,  docpan: e.target.value })
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
                          <FormLabel>Country:</FormLabel>   
                          <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                           <option key={country.isoCode} value={country.isoCode}>
                             {country.name}
                             </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>State:</FormLabel>
                          <select className="form-select" id="inputState" value={data.state} onChange={handleStateChange} >
                      <option value="">Select state</option>
                     {states.map((item, index) => (
                     <option key={index} value={item.isoCode}>
                     {item.name}
                    </option>
                    ))}
                    </select>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>City:</FormLabel>
                          <select className="form-select" id="inputCity" value={data.city}
                         onChange={(e) => setData({ ...data, city: e.target.value })} >
                         <option value="">Select city</option>
                        {cities.map((item, index) => (
                        <option key={index} value={item.isoCode}>
                        {item.name}
                        </option>
                        ))}
                      </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Pincode:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, pin: e.target.value })
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
                          <FormLabel>Document Registration No:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, document_reg_no: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel> Terms_& Conditions </FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data,  terms_and_conditions: e.target.value })
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
                          <FormLabel>Shop Image:</FormLabel>
                          <Input
                            autoFocus
                            required
                            type="file"
                            className="form-control rounded-0"
                            name="image"
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, shop_photo: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ width: "95%" }}>
                          <FormLabel>Password:</FormLabel>
                          <Input
                            autoFocus
                            required
                            placeholder="Enter Name"
                            onChange={(e) =>
                              setData({ ...data, password: e.target.value })
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
                          <FormLabel>Status:</FormLabel>
                          Active:
                        <Switch {...FormLabel} defaultChecked />
                        Deactive:
                        <Switch {...FormLabel}  defaultChecked/>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </FormControl>
                <Button  type="submit" >Submit</Button>
                </Stack>
                </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment> 
    <button> </button>
         
              </StyledTableCell>
      
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
               
            </table>
          </div>
        </div>
       </div> 
    </div>
   
    )
  }

 