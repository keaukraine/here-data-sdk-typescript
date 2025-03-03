/*
 * Copyright (C) 2021 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

/**
 * Blob API v2
 * The `blob` service supports the upload and retrieval of large volumes of data from the storage of a catalog.
 * Each discrete chunk of data is stored as a blob (Binary Large Object). Each blob has its own unique ID (handle or key),
 * which can be stored as partition metadata.
 * Accessing blobs can be done either by key or by handle, not both for the same layer.
 * When accessing by key is enabled, you can use keys to store and retrieve blobs, but not data handles.
 * Keys follow a user-defined format for the layers while data handles are opaque identifiers.
 * The access-by-key API has different capabilities of the access-by-data-handle API and different endpoints:
 * enabling access by key implies the capability to update blobs, while operating via data handles is more efficient
 * and provides room for optimization on both the client side and inside the service. In case the access pattern is by key,
 * you can enable the optional capability of listing which keys are stored in the layer. This capability has a negative impact
 * on the access times when getting and saving blobs and therefore must be enabled explicitly.
 *
 * OpenAPI spec version: 2.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Do not edit the class manually.
 */

import { UrlBuilder, RequestBuilder, RequestOptions } from "./RequestBuilder";

/**
 * The identifier of the blob.
 */
export interface DataHandleResponse {
    /**
     * The identifier of the blob.
     */
    handle: string;
}

/**
 * Object or common prefix stored in Object Store layer.
 */
export interface KeysListObjectItemResponse {
    /**
     * Name of the object/common prefix.
     */
    name: string;
    /**
     * Object size in bytes or omitted if the `type` field is `commonPrefix`.
     */
    size?: number;
    /**
     * Last modified date and time in RFC 3339 format or omitted if the `type` field is `commonPrefix`.
     */
    lastModified?: Date;
    /**
     * Indicates whether the item is object or common prefix.
     * Can be "object" or "commonPrefix";
     */
    type: string;
}

/**
 * Paginated response of keys and common prefixes.
 */
export interface KeysListResponse {
    /**
     * Page token to fetch the next page.
     */
    pageToken: string;
    items: KeysListObjectItemResponse[];
}

export interface MultipartCompletePart {
    /**
     * The identifier assigned by the system to identify the uploaded part.
     * The `id` is returned by the upload part operation after successfully uploading a part.
     */
    id: string;
    /**
     * The number of the part of the multipart upload.
     * This is the same number used in the `partNumber` parameter in the upload part operation.
     * If an error occurs during upload, do not reuse the `partNumber` when retrying the upload.
     */
    number: number;
}

export interface MultipartCompleteRequest {
    parts?: MultipartCompletePart[];
}

/**
 * Describes a status of the multipart upload.
 */
export interface MultipartHandleUploadStatus {
    /**
     * The status of the multipart upload.
     * Can be "failed" | "processing" | "completed"
     */
    status: string;
    /**
     * The data handle that identifies a specific blob so that you can get that blob's contents.
     * Present only when the upload is complete.
     */
    handle?: string;
}

/**
 * The identifier of the multipart upload (token).
 */
export interface MultipartInitResponse {
    /**
     * The identifier of the multipart upload (token).
     */
    multipartToken: string;
}

/**
 * Describes a status of the multipart upload.
 */
export interface MultipartKeyUploadStatus {
    /**
     * The status of the multipart upload.
     * Can be "failed" | "processing" | "completed"
     */
    status: string;
}

/**
 * Multipart upload metadata by handle
 */
export interface MultipartUploadByHandleMetadata {
    /**
     * Content type of the uploaded object. Must be equal to the layer content type.
     */
    contentType: string;
    /**
     * Content encoding of the uploaded object. Must be equal to the layer content encoding.
     */
    contentEncoding?: string;
}

/**
 * Multipart upload metadata by key
 */
export interface MultipartUploadByKeyMetadata {
    /**
     * Content type of the uploaded object.
     */
    contentType: string;
    /**
     * Content encoding of the uploaded object.
     */
    contentEncoding?: string;
}

export interface PartId {
    /**
     * The identifier assigned by the system to identify the uploaded part.
     */
    id: string;
}

export interface ServerError {
    /**
     * Error.
     */
    title?: string;
    /**
     * Unexpected Server error.
     */
    status?: number;
    /**
     * Error.
     */
    code?: string;
    /**
     * Unexpected server error
     */
    message?: string;
    /**
     * Unique request ID
     */
    correlationId?: string;
}

export interface ValidationError {
    /**
     * Error
     */
    title: string;
    /**
     * Unexpected server error
     */
    status: number;
    /**
     * Error.
     */
    code?: string;
    /**
     * Unexpected server error
     */
    message?: string;
    /**
     * Unique request ID
     */
    correlationId?: string;
}

/*
 * ===================================================================
 * ByKeyApi
 * ===================================================================
 */

/**
 * Cancels an entire multipart upload operation. You can only cancel a multipart upload before it has been completed.
 *
 * @summary Cancels a multipart upload.
 * @param layerId The ID of the parent layer for this blob.
 * @param multipartToken The identifier of the multipart upload (token).
 * Content of this parameter must refer to a valid token which when the multipart upload was initiated.
 */
export async function cancelMultipartUploadByKey(
    builder: RequestBuilder,
    params: { layerId: string; multipartToken: string }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/keysMultipart/{multipartToken}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace(
            "{multipartToken}",
            UrlBuilder.toString(params["multipartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "DELETE",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Checks if a blob exists for the requested key.
 *
 * @summary Checks if a key exists.
 * @param layerId The ID of the parent layer for this blob.
 * @param key The key identifies a specific blob so that you can get that blob's contents.
 * Key can only contain allowed characters: a-zA-Z0-9.[](){}/_-&.
 */
export async function checkKeyExists(
    builder: RequestBuilder,
    params: { layerId: string; key: string }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/keys/{key}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{key}", UrlBuilder.toString(params["key"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "HEAD",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Call this API when all parts have been uploaded.
 *
 * @summary Completes a multipart upload.
 * @param layerId The ID of the parent layer for this blob.
 * @param multipartToken The identifier of the multipart upload (token).
 * Content of this parameter must refer to a valid token which when the multipart upload was initiated.
 * @param body The part IDs uploaded in this multipart upload which should be used in the resulting blob.
 */
export async function completeMultipartUploadByKey(
    builder: RequestBuilder,
    params: {
        layerId: string;
        multipartToken: string;
        body?: MultipartCompleteRequest;
    }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/keysMultipart/{multipartToken}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace(
            "{multipartToken}",
            UrlBuilder.toString(params["multipartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "PUT",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Deletes a data blob.
 *
 * @summary Deletes a data blob.
 * @param layerId The ID of the parent layer for this blob.
 * @param key The key identifies a specific blob so that you can get that blob's contents.
 * Key can only contain allowed characters: a-zA-Z0-9.[]&(){}/_-&.
 */
export async function deleteBlobByKey(
    builder: RequestBuilder,
    params: { layerId: string; key: string }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/keys/{key}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{key}", UrlBuilder.toString(params["key"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "DELETE",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Retrieves a blob from storage.
 *
 * @summary Gets a blob.
 * @param layerId The ID of the parent layer for this blob.
 * @param key The key identifies a specific blob so that you can get that blob's contents.
 * Key can only contain allowed characters: a-zA-Z0-9.[]&(){}/_;.
 * @param range Use this parameter to resume download of a large response when there is a connection issue between the client and server,
 * or to fetch a specific slice of the blob. To resume download after a connection issue,
 * specify a single byte range offset as follows: Range: bytes&10;.
 * To fetch a specific slice of the blob, specify a slice as follows:
 * Range: bytes&10-100. This parameter is compliant with [RFC 7233](https://tools.ietf.org/html/rfc7233),
 * but note that this parameter only supports a single byte range.
 * You can also specify the range parameter as a query parameter, for example range&bytes&10;.
 */
export async function getBlobByKey(
    builder: RequestBuilder,
    params: { layerId: string; key: string; range?: string }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/keys/{key}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{key}", UrlBuilder.toString(params["key"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };
    if (params["range"] !== undefined) {
        headers["Range"] = params["range"];
    }

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Gets the status of a multipart upload. The status can be received only when the upload has been completed.
 *
 * @summary Gets the status of a multipart upload.
 * @param layerId The ID of the parent layer for this blob.
 * @param multipartToken The identifier of the multipart upload (token).
 * Content of this parameter must refer to a valid token which when the multipart upload was initiated.
 */
export async function getMultipartUploadStatusByKey(
    builder: RequestBuilder,
    params: { layerId: string; multipartToken: string }
): Promise<MultipartKeyUploadStatus> {
    const baseUrl = "/layers/{layerId}/keysMultipart/{multipartToken}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace(
            "{multipartToken}",
            UrlBuilder.toString(params["multipartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<MultipartKeyUploadStatus>(urlBuilder, options);
}

/**
 * List virtual directory-like structure created from keys in the storage where '/' is used as a separator.
 *
 * @summary List keys.
 * @param layerId The ID of the parent layer for this blob.
 * @param parent Common prefix to a list.
 * @param pageToken If specified, will return the specific page based on the token.
 * @param limit Number of results to return per page.
 * @param deep Use deep (recursive) listing of objects instead of hierarchical listing.
 * Deep listing will not produce any common prefixes.
 */
export async function listKeys(
    builder: RequestBuilder,
    params: {
        layerId: string;
        parent?: string;
        pageToken?: string;
        limit?: number;
        deep?: "true" | "false";
    }
): Promise<KeysListResponse> {
    const baseUrl = "/layers/{layerId}/keys".replace(
        "{layerId}",
        UrlBuilder.toString(params["layerId"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("parent", params["parent"]);
    urlBuilder.appendQuery("pageToken", params["pageToken"]);
    urlBuilder.appendQuery("limit", params["limit"]);
    urlBuilder.appendQuery("deep", params["deep"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<KeysListResponse>(urlBuilder, options);
}

/**
 * Persists the data blob up to 192 MB. When the operation completes successfully,
 * there is no guarantee that the data blob will be immediately available, although in most cases,
 * it will be. To check if the data blob is available, use the ´HEAD´ method. The maximum key length is 450 characters.
 *
 * @summary Publishes a data blob or copies an existing blob.
 * @param layerId The ID of the parent layer for this blob.
 * @param key The key identifies a specific blob so that you can get that blob's contents.
 * Key can only contain allowed characters: a-zA-Z0-9.[]&(){}/_;.
 * @param contentLength Size of the entity-body, in bytes.
 * For more information, see [RFC 7230, section 3.3.2: Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2).
 * @param body Request body. Must be empty when copying an object using the source parameter.
 * @param source Copy an already-existing object, instead of uploading a new one. If this parameter is present,
 * teh request payload must be empty.
 */
export async function putBlobByKey(
    builder: RequestBuilder,
    params: {
        layerId: string;
        key: string;
        contentLength: number;
        body?: string;
        source?: string;
    }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/keys/{key}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{key}", UrlBuilder.toString(params["key"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("source", params["source"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "PUT",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }
    if (params["contentLength"] !== undefined) {
        headers["Content-Length"] = `${params["contentLength"]}`;
    }

    return builder.requestBlob(urlBuilder, options);
}

/**
 * Publishes large data blobs where the data payload needs to be split into multiple parts.
 * The multipart upload start is to be followed by the individual parts upload and completed
 * with a call to complete the upload. The limit of the blob uploaded this way is 50GB.
 * Max key length is 450 characters.
 *
 * @summary Starts a multipart upload.
 * @param body An object that contains metadata of the uploaded object.
 * @param layerId The ID of the parent layer for this blob.
 * @param key The key identifies a specific blob so that you can get that blob's contents.
 * Key can only contain allowed characters: a-zA-Z0-9.[]&(){}/_;.
 */
export async function startMultipartUploadByKey(
    builder: RequestBuilder,
    params: { body: MultipartUploadByKeyMetadata; layerId: string; key: string }
): Promise<MultipartInitResponse> {
    const baseUrl = "/layers/{layerId}/keys/{key}"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace("{key}", UrlBuilder.toString(params["key"]));

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["body"] !== undefined) {
        options.body = JSON.stringify(params["body"]);
    }

    return builder.request<MultipartInitResponse>(urlBuilder, options);
}

/**
 * Upload or copy a single part of a multipart upload or multipart copy for the blob.
 * Every part except the last one must have a minimum 5 MB of data and maximum of 96 MB.
 * The length of every part except the last one must be multiple of 1MB (1024KB).
 * The maximum number of parts is 10,000.
 *
 * @summary Uploads a part or creates a new part from part of an existing blob.
 * @param body The body relates to upload only. The data to upload as part of the blob.
 * @param layerId The ID of the parent layer for this blob.
 * @param multipartToken The identifier of the multipart upload (token).
 * Content of this parameter must refer to a valid token which when the multipart upload was initiated.
 * @param partNumber This parameter relates to upload and copy. The number of the part for the multipart upload or copy.
 * The numbers of the upload parts must start from 1, be no greater than 10,000 and be consecutive.
 * Parts uploaded with the same partNumber are overridden. Do not reuse the same partNumber when retrying
 * an upload or copy in an error situation (network problems, 4xx or 5xx responses).
 * Reusing the same partNumber in a retry may cause the publication to fail.
 * @param contentLength This header relates to upload only. Size of the entity-body, in bytes.
 * For more information, see [RFC 7230, section 3.3.2: Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2).
 * @param contentType This header relates to upload only. A standard MIME type describing the format of the blob data.
 * For more information, see [RFC 2616, section 14.17: Content-Type](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17).
 * The value of this header must match the content type specified in the contentType field when the multipart upload was initialized,
 * and this content type must also match the content type specified in the layer's configuration.
 * @param source Copy part from an existing object, use range to specify which parts of the object to copy.
 * @param range This header/parameter relates to object copy using the 'source' parameter. Use this parameter
 * to copy a specific slice of the blob like this: Range: bytes&0-1048575. This parameter is compliant
 * with [RFC 7233](https://tools.ietf.org/html/rfc7233), but note that this parameter only supports a
 * single byte range and both begin and end values of the range must be specified.
 * The range begin value must be multiple of 1MB (1024KB).
 * The length of every part except the last one must be multiple of 1MB (1024KB).
 * The range parameter can also be specified as a query parameter, for example range&bytes&0-1048575.
 */
export async function uploadPartByKey(
    builder: RequestBuilder,
    params: {
        body: string | ArrayBufferLike;
        layerId: string;
        multipartToken: string;
        partNumber: number;
        contentLength?: number;
        contentType?: string;
        source?: string;
        range?: string;
    }
): Promise<PartId> {
    const baseUrl = "/layers/{layerId}/keysMultipart/{multipartToken}/parts"
        .replace("{layerId}", UrlBuilder.toString(params["layerId"]))
        .replace(
            "{multipartToken}",
            UrlBuilder.toString(params["multipartToken"])
        );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("partNumber", params["partNumber"]);
    urlBuilder.appendQuery("source", params["source"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };
    headers["Content-Type"] = "application/json";
    options.body = params["body"] as any;

    if (params["contentLength"] !== undefined) {
        headers["Content-Length"] = `${params["contentLength"]}`;
    }
    if (params["contentType"] !== undefined) {
        headers["Content-Type"] = params["contentType"];
    }
    if (params["range"] !== undefined) {
        headers["Range"] = params["range"];
    }

    return builder.request<PartId>(urlBuilder, options);
}
