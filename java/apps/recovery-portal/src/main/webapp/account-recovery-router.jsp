<%--
  ~ Copyright (c) 2018, WSO2 LLC. (https://www.wso2.com) All Rights Reserved.
  ~
  ~  WSO2 LLC. licenses this file to you under the Apache License,
  ~  Version 2.0 (the "License"); you may not use this file except
  ~  in compliance with the License.
  ~  You may obtain a copy of the License at
  ~
  ~    http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing,
  ~ software distributed under the License is distributed on an
  ~ "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  ~ KIND, either express or implied.  See the License for the
  ~ specific language governing permissions and limitations
  ~ under the License.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.wso2.carbon.identity.mgt.endpoint.util.IdentityManagementEndpointConstants" %>

<%
    boolean enableMultiTenancy = Boolean.parseBoolean(application.getInitParameter(
            IdentityManagementEndpointConstants.RecoveryOptions.ENABLE_MULTI_TENANCY));
    boolean isUsernameRecovery = Boolean.parseBoolean(request.getParameter("isUsernameRecovery"));
    boolean isMultiClaimPasswordRecoveryEnabled = Boolean.parseBoolean(application.getInitParameter(
            "EnableMultiClaimPasswordRecovery"));

    if (isUsernameRecovery) {
        if (enableMultiTenancy) {
            request.getRequestDispatcher("username-recovery-tenant-request.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("username-recovery.jsp").forward(request, response);
        }
    } else {
        if (isMultiClaimPasswordRecoveryEnabled) {
            if (enableMultiTenancy) {
                request.getRequestDispatcher("password-recovery-tenant-request.jsp").forward(request, response);
            } else {
                request.getRequestDispatcher("password-recovery-with-claims.jsp").forward(request, response);
            }
        }
        else {
            if (enableMultiTenancy) {
                request.getRequestDispatcher("password-recovery-username-request.jsp").forward(request, response);
            } else {
                request.getRequestDispatcher("password-recovery.jsp").forward(request, response);
            }
        }
    }
%>
