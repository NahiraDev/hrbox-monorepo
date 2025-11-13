#!/bin/bash

# Script to convert PFX certificate to PEM format for Vite
# Usage: ./convert-pfx.sh

CERTS_DIR="./certs"
PFX_FILE="$CERTS_DIR/cert_hrbox.pfx"
PASSWORD_FILE="$CERTS_DIR/cert_hrbox_pfx-pass.txt"
KEY_FILE="$CERTS_DIR/cert_hrbox.key"
CERT_FILE="$CERTS_DIR/cert_hrbox.crt"
CA_FILE="$CERTS_DIR/cert_hrbox_ca.crt"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔐 Starting SSL certificate conversion...${NC}"

# Check if PFX file exists
if [ ! -f "$PFX_FILE" ]; then
    echo -e "${RED}❌ Error: PFX file not found at $PFX_FILE${NC}"
    exit 1
fi

# Check if password file exists
if [ ! -f "$PASSWORD_FILE" ]; then
    echo -e "${RED}❌ Error: Password file not found at $PASSWORD_FILE${NC}"
    exit 1
fi

# Read password from file
PASSWORD=$(cat "$PASSWORD_FILE")

echo -e "${YELLOW}📝 Converting PFX to PEM format...${NC}"

# Extract Private Key
echo -e "${YELLOW}  → Extracting private key...${NC}"
openssl pkcs12 -in "$PFX_FILE" -nocerts -out "$KEY_FILE" -nodes -passin pass:"$PASSWORD"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✓ Private key extracted successfully${NC}"
else
    echo -e "${RED}  ✗ Failed to extract private key${NC}"
    exit 1
fi

# Extract Certificate
echo -e "${YELLOW}  → Extracting certificate...${NC}"
openssl pkcs12 -in "$PFX_FILE" -clcerts -nokeys -out "$CERT_FILE" -passin pass:"$PASSWORD"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✓ Certificate extracted successfully${NC}"
else
    echo -e "${RED}  ✗ Failed to extract certificate${NC}"
    exit 1
fi

# Extract CA Bundle (optional)
echo -e "${YELLOW}  → Extracting CA bundle...${NC}"
openssl pkcs12 -in "$PFX_FILE" -cacerts -nokeys -out "$CA_FILE" -passin pass:"$PASSWORD"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}  ✓ CA bundle extracted successfully${NC}"
else
    echo -e "${YELLOW}  ⚠ CA bundle extraction failed (optional)${NC}"
fi

echo ""
echo -e "${GREEN}✅ SSL certificate conversion completed!${NC}"
echo ""
echo -e "${YELLOW}Generated files:${NC}"
echo -e "  📄 Private Key: $KEY_FILE"
echo -e "  📄 Certificate: $CERT_FILE"
echo -e "  📄 CA Bundle:   $CA_FILE"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Update your .env file with correct domain settings"
echo -e "  2. Run 'npm run dev' or 'yarn dev'"
echo -e "  3. Access your app at https://front.hrbox.me"
echo ""

# Set proper permissions
chmod 600 "$KEY_FILE"
chmod 644 "$CERT_FILE"

echo -e "${GREEN}🔒 File permissions set correctly${NC}"
