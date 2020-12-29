export function v2_homePageApiV2_getAdPositionidConfig() {
    return Promise.resolve({
        auth: {
            roles: 'Manager',
            resources: ['SHIELD-USER-GROUP']
        }
    });
}
// 其他的，待删除
export function other() {
    return Promise.resolve({
        auth: {
            roles: 'Manager',
            resources: ['SHIELD-USER-GROUP']
        }
    });
}
