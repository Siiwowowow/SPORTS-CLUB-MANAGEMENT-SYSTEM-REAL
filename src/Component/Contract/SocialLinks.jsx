import React from 'react';

const SocialLinks = () => {
    return (
        <div>
            <div className="flex items-center space-x-5 mt-6 text-gray-500 group-hover:text-white">
                        <a href='https://www.facebook.com/profile.php?id=61570506449242' target="_blank" aria-label="LinkedIn profile" className="hover:text-blue-400 transition">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z"/>
                            </svg>
                        </a>
                       
                        <a href='https://www.facebook.com/profile.php?id=61570506449242' target="_blank" aria-label="Twitter profile" className="hover:text-blue-400 transition">
                            <svg width="20" height="18" viewBox="0 0 19 16" fill="currentColor">
                                <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z"/>
                            </svg>
                        </a>
                    </div>
        </div>
    );
};

export default SocialLinks;