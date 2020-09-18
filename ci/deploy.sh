#!/bin/sh
lftp -e "set ssl:verify-certificate false; set ftp:ssl-allow no; open '$FTP_DOMAIN'; user '$FTP_USER_NAME' '$FTP_USER_PASS'; mirror -X .* -X .*/ --reverse --verbose --delete storybook-static/ $FTP_REMOTE_DIR; bye"