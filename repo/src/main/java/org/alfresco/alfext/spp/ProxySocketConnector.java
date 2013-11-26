package org.alfresco.alfext.spp;

import java.io.IOException;

import org.mortbay.io.EndPoint;
import org.mortbay.jetty.HttpFields;
import org.mortbay.jetty.Request;
import org.mortbay.jetty.bio.SocketConnector;

/**
 * Adds the ability to jetty 6.1 to make use of the X-Forwared-Proto header.
 * 
 * @author lothar
 * @since 1.0
 */
public class ProxySocketConnector extends SocketConnector {
    protected static final String FORWARDED_PROTO_HEADER_DEFAULT = "X-Forwarded-Proto";
    protected String forwardedProtocolHeader = FORWARDED_PROTO_HEADER_DEFAULT;

    protected void checkForwardedHeaders(EndPoint endpoint, Request request) throws IOException {
        // jetty handles already X-Forwarded-Host, X-Forwarded-Server,
        // x-Forwarded-For
        super.checkForwardedHeaders(endpoint, request);

        HttpFields httpFields = request.getConnection().getRequestFields();
        // there could be multiple values
        String forwardedProtocolH = httpFields.getStringField(getForwardedProtocolHeader());
        String forwardedProtocol = getLeftMostValue(forwardedProtocolH);
        if (forwardedProtocol != null) {
            request.setScheme(forwardedProtocol);
        }
    }

    public String getForwardedProtocolHeader() {
        return forwardedProtocolHeader;
    }

    public void setForwardedProtocolHeader(String forwardedProtocolHeader) {
        this.forwardedProtocolHeader = forwardedProtocolHeader;
    }

}
