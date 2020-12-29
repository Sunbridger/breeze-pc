import IndexPage from '@/views/index.vue';

jest.mock('@/api/url/finance');

describe('首页测试', () => {

    it('生命周期测试', (done) => {

        const factory = create(IndexPage);

        const wrapper = factory(IndexPage);

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.a).toBe(2);
            done();
        });
    });

    it('入参为空1', (done) => {

        const factory = create(IndexPage);

        const wrapper = factory(IndexPage);

        wrapper.vm.plus();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.a).toBe(3);
            done();
        });
    });

});
