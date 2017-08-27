
export interface PageInfo {

    has_next_page: boolean;
    end_cursor: string;

}

export interface InnerNode {

    id: string;
    username: string;
    full_name: string;
    // profile_pic_url: string;
    // is_verified: string;
    // followed_by_viewer: string;
    // requested_by_viewer: string;}
}

export interface Node {

    node: InnerNode;
}

export interface FollowerResponse {

    count: number;
    page_info: PageInfo;
    edges: Node[]

}
