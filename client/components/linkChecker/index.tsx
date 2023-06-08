import React from 'react';
import { Input } from '@material-tailwind/react';
import { BsMicrosoftTeams } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si"

const LinkChecker = () => {

    const [link, setLink] = React.useState('');

    const isTeamsLink = /^https?:\/\/teams\.microsoft\.com\/.*$/.test(link);
    const isMeetLink = /^https?:\/\/meet\.google\.com\/.*$/.test(link);

    return <Input
        type='text'
        label="Lien de la réunion"
        icon={isTeamsLink ? <BsMicrosoftTeams /> : isMeetLink ? <SiGooglemeet /> : undefined}
        value={link}
        onChange={(e) => setLink(e.target.value)}
    />;
};

export default LinkChecker;
