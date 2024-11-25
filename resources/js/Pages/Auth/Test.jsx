import React, { useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import UserProfileEdit from '@/Pages/Profile/Partials/UserProfileEdit'


const DynamicCompanyEmailForm = ({user, userProfile}) => {
    const { auth } = usePage().props;


    return (
        <UserProfileEdit user={auth.user} userProfile={userProfile}/>

    );
};

export default DynamicCompanyEmailForm;
