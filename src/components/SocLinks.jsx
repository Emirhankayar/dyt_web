import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMediaIcons } from '../utils/shared';

const SocLinks = () => {



  return (
    <>

                  <div className="flex flex-row items-center justify-center mt-4">
                    {Object.keys(socialMediaIcons).map((socialMedia) => (
                      <a
                        key={socialMedia}
                        href={socialMediaIcons[socialMedia].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='py-2 px-2'
                        aria-label={socialMedia}
                      >
                        <FontAwesomeIcon
                          icon={socialMediaIcons[socialMedia].icon}
                          className="text-black text-2xl mx-4 -mb-2"
                        />
                      </a>
                    ))}
                  </div>

    </>
  );
};

export default SocLinks;



