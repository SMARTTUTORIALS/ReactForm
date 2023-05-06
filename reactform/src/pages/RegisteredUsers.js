import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import requests from '../api/requests'
import DataTable from 'react-data-table-component'
import Notification from '../components/Notification'

const RegisteredUsers = () => {

    const [userData, setUserData] = useState([]);
    const [searchQuery, setSeachQuery] = useState("");
    const [filteredUserData, setFilteredUserData] = useState([]);
    const [notificationData, setNotificationData] = useState({
        category: "",
        message: "",
        timestamp: "",
    });

    const getUserData = async () => {
        try {
            const response = await axios.get(requests.fetchAllUser);
            setUserData(response.data);
            setFilteredUserData(response.data);

        } catch (error) {
            setNotificationData({
                category: "Error!",
                message: "Unable to fetch data from server",
                timestamp: "",
            });
            const toast = window.bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
            toast.show();
        }
    }

    useEffect(() => {
        getUserData();

    }, []);

    useEffect(() => {
        const result = userData.filter(dataRow => {
            return dataRow.username.toLowerCase().match(searchQuery.toLowerCase());
        });

        setFilteredUserData(result);

        // eslint-disable-next-line
    }, [searchQuery]);

    const calculateAge = (value) => {
        if (value.includes("/")) {
            const year = parseInt(value.split("/")[2]);
            const currentYear = new Date().getFullYear();
            return (currentYear - year).toString();
        } else {
            return value;
        }
    }

    const columns = [
        {
            name: "Name",
            selector: data => <span className='text-wrap'>{data.username}</span>,
        },
        {
            name: "Age/Sex",
            selector: data => <span className='text-wrap'>{`${calculateAge(data.age)} Y / ${data.gender}`}</span>,
        },
        {
            name: "Mobile",
            selector: data => <span className='text-wrap'>{data.mobile}</span>,
        },
        {
            name: "Address",
            selector: data => <span className='text-wrap'>{`${data.address && data.address} ${data.state && data.state} ${data.city && data.city} ${data.country && data.country} ${data.pincode && '(' + data.pincode + ')'}`}</span>,
        },
        {
            name: "Govt ID",
            selector: data => <span className='text-wrap'>{`${data.govtIdType} ${data.govtId}`}</span>,
        },
        {
            name: "Guardian Details",
            selector: data => <span className='text-wrap'>{`${data.guardianSalutation} ${data.guardianName}`}</span>,
        },
        {
            name: "Nationality",
            selector: data => <span className='text-wrap'>{data.nationality}</span>,
        },
    ]

    return (
        <div>
            <DataTable
                className='my-1 container-fluid'
                columns={columns}
                data={filteredUserData}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='550px'
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type='text'
                        placeholder='Search by name here'
                        className='w-25 form-control'
                        value={searchQuery}
                        onChange={e => setSeachQuery(e.target.value)}
                    />
                }

            />

            <Notification {...notificationData} />
        </div>
    )
}

export default RegisteredUsers