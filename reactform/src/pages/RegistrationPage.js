import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { userSchema } from '../validations/UserValidation'
import { yupResolver } from '@hookform/resolvers/yup'

import axios from '../api/axios'
import requests from '../api/requests'
import Notification from '../components/Notification'
import statencities from '../utils/StateAndCityNames'

const RegistrationPage = () => {

    //Initialize the react-hook-form and pass the validation schema created with Yup library
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema),
    });

    const [cities, setCities] = useState([]);
    const stateList = Object.keys(statencities);

    const [notificationData, setNotificationData] = useState({
        category: "",
        message: "",
        timestamp: "",
    });

    //submit data to backend server via api call
    const onSubmit = async (data) => {


        //post data to server
        try {
            const response = await axios.post(requests.registerUser, data);
            setNotificationData({
                category: "Success!",
                message: response.data,
                timestamp: "",
            });
            //Display a notification for user 
            const toast = window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
            toast.show();
            reset();

        } catch (err) {
            setNotificationData({
                category: "Error!",
                message: err.message,
                timestamp: "",
            });
            //Display a notification for user 
            const toast = window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
            toast.show();
        }

    };

    const handleReset = () => {
        //reset the form and clear all values
        reset();
    }

    return (
        <>
            <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)} className="form-control p-5">
                    {/*Personal Details Section */}
                    <div className="row row-gap-2">
                        <h5 className="text-decoration-underline mb-2">Personal Details</h5>
                        <div className="col-md-5 mt-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="username" className="p-2">Name<span className="text-danger fw-bold">*</span></label>
                                <input {...register("username")} type="text" className="form-control" id="username" placeholder="Enter Name" />
                            </div>
                            {errors?.username && <p className='fs-6 text-danger text-end'>{errors?.username?.message}</p>}
                        </div>
                        <div className="col-md-5">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="userage" className="p-2">Date of Birth or Age<span
                                    className="text-danger fw-bold">*</span></label>
                                <input {...register("age")} type="text" className="form-control" id="userage" placeholder="DD/MM/YYYY or Age in Years" />
                            </div>
                            {errors?.age && <p className='fs-6 text-danger text-end'>{errors?.age?.message}</p>}
                        </div>
                        <div className="col-md-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="usergender" className="p-2">Sex<span className="text-danger fw-bold">*</span></label>
                                <select {...register("gender")} defaultValue={""} className="form-select" id="usergender" name="gender" >
                                    <option disabled value="">Enter Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="No Disclose">Prefer not to Disclose</option>
                                </select>
                            </div>
                            {errors?.gender && <p className='fs-6 text-danger text-end'>{errors?.gender?.message}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 mt-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="mobile" className="p-2">Mobile</label>
                                <input {...register("mobile")} defaultValue={"NA"} type="tel" className="form-control w-75" id="mobile" placeholder="Enter Mobile"
                                    maxLength="13" size="20" />
                            </div>
                            {errors?.mobile && <p className='fs-6 text-danger text-end'>{errors?.mobile?.message}</p>}
                        </div>
                        <div className="col-md-7 mt-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="govtIdType" className="p-2 text-nowrap">Govt Issued ID</label>
                                <select {...register("govtIdType")} defaultValue={"NA"} className="form-select w-25 me-2" id="govtIdType" name="govtIdType">
                                    <option value="NA">ID Type</option>
                                    <option value="Aadhar">Aadhar</option>
                                    <option value="PAN">PAN</option>

                                </select>
                                <input {...register("govtId")} type="tel" className="form-control w-75" id="govtId" placeholder="Enter Govt ID"
                                    maxLength="13" size="20" />
                            </div>
                            {errors?.govtId && <p className='fs-6 text-danger text-end'>{errors?.govtId?.message}</p>}
                        </div>
                    </div>
                    {/*Contact Details Section*/}
                    <div className="row mt-5">
                        <h5 className="text-decoration-underline mb-2">Contact Details</h5>
                        <div className="col-md-5 mt-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="guardianDetails" className="p-2 text-nowrap">Guardian Details</label>
                                <select {...register("guardianSalutation")} defaultValue={""} className="form-select w-25 me-2" id="guardianSalutation" name="guardianSalutation">
                                    <option value="">Enter Label</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>

                                </select>
                                <input {...register("guardianName")} defaultValue={"NA"} type="text" className="form-control" id="guardianName"
                                    placeholder="Enter Guardian Name" />

                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="email" className="p-2 text-nowrap">Email</label>
                                <input {...register("email")} defaultValue={"NA"} type="email" className="form-control" id="email" placeholder="Enter Email" />
                            </div>
                        </div>
                        <div className="col-md-3 mt-2">
                            <div className="d-flex flex-row flex-nowrap">
                                <label htmlFor="emergencyPhone" className="p-2">Emergency Contact Number</label>
                                <input {...register("emergencyPhone")} defaultValue={"NA"} type="tel" className="form-control w-75" id="emergencyPhone" placeholder="Enter Emergency No"
                                    maxLength="13" size="20" />

                            </div>
                            {errors?.emergencyPhone && <p className='fs-6 text-danger text-end'>{errors?.emergencyPhone?.message}</p>}
                        </div>
                    </div>
                    {/*Address Details Section*/}
                    <div className="row mt-5">
                        <div className="row">
                            <h5 className="text-decoration-underline mb-2">Address Details</h5>
                            <div className="col-md-5 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="address" className="p-2 text-nowrap">Address</label>
                                    <input {...register("address")} type="text" className="form-control" id="address" placeholder="Enter Address" />
                                </div>
                            </div>
                            <div className="col-md-4 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="state" className="p-2 text-nowrap">State</label>
                                    <select {...register("state")} defaultValue={""} className="form-select me-2" id="state" name="state" onChange={(e) => setCities(statencities[e.target.value])}>
                                        <option value="">Enter State</option>
                                        {
                                            stateList.map(state => <option value={state} key={state}>{state}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="city" className="p-2 text-nowrap">City</label>
                                    <select {...register("city")} defaultValue={""} className="form-select me-2" id="city" name="city">
                                        <option value="">Enter city/town/village</option>
                                        {
                                            cities.map(city => <option value={city} key={cities.indexOf(city)}>{city}</option>)

                                        }

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-5 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="country" className="p-2 text-nowrap">Country</label>
                                    <input {...register("country")} type="search" className="form-control" id="country" defaultValue="India" />
                                </div>
                            </div>
                            <div className="col-md-4 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="pincode" className="p-2 text-nowrap">Pincode</label>
                                    <input {...register("pincode")} type="tel" className="form-control w-50" id="pincode" placeholder="Enter Pincode" />
                                </div>
                            </div>

                        </div>


                    </div>
                    {/*Other Details Section */}
                    <div className="row mt-5">
                        <div className="row">
                            <h5 className="text-decoration-underline mb-2">Other Details</h5>
                            <div className="col-md-3 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="occupation" className="p-2 text-nowrap">Occupation</label>
                                    <input {...register("occupation")} type="text" className="form-control" id="occupation" placeholder="Enter occupation" />
                                </div>
                            </div>
                            <div className="col-md-3 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="religion" className="p-2 text-nowrap">Religion</label>
                                    <select {...register("religion")} defaultValue={"NA"} className="form-select me-2" id="religion" name="religion">
                                        <option value="NA">Enter Religion</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Sikh">Sikh</option>
                                        <option value="Buddhist">Buddhist</option>
                                        <option value="Jain">Jain</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="maritalStatus" className="p-2 text-nowrap">Marital Status</label>
                                    <select {...register("maritalStatus")} defaultValue={"NA"} className="form-select me-2" id="maritalStatus" name="maritalStatus">
                                        <option value="NA">Enter Marital Status</option>
                                        <option value="Married">Married</option>
                                        <option value="Un-Married">Un-Married</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="bloodGroup" className="p-2 text-nowrap">Blood Group</label>
                                    <select {...register("bloodGroup")} defaultValue={"NA"} className="form-select me-2" id="bloodGroup" name="bloodGroup">
                                        <option value="NA">Group</option>
                                        <option value="A Positive">A +ve</option>
                                        <option value="A Negative">A -ve</option>
                                        <option value="B Positive">B +ve</option>
                                        <option value="B Negative">B -ve</option>
                                        <option value="AB Positive">AB +ve</option>
                                        <option value="AB Negative">AB -ve</option>
                                        <option value="O Positive">O +ve</option>
                                        <option value="O Negative">O -ve</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-3 mt-2">
                                <div className="d-flex flex-row flex-nowrap">
                                    <label htmlFor="nationality" className="p-2 text-nowrap">Nationality</label>
                                    <input {...register("nationality")} type="search" className="form-control" id="nationality" defaultValue="India" />
                                </div>
                            </div>


                        </div>


                    </div>
                    {/*Submit Section */}
                    <div className="row mt-5 justify-content-end">
                        <div className="col-sm-1 d-sm-flex justify-content-end gap-3 row-gap-4">
                            <button type='reset' onClick={handleReset} className="btn btn-outline-danger mx-2 my-3 px-5 py-2">CANCEL <span className="text-decoration-underline">(ESC)</span></button>

                            <button type='submit' className="btn btn-outline-success mx-2 my-3 px-5 py-2">
                                SUBMIT
                                <span className="text-decoration-underline"> (<i className="bi bi-command"></i> S)</span>
                            </button>

                        </div>
                    </div>

                </form>
            </div>

            <Notification {...notificationData} />
        </>
    )
}

export default RegistrationPage