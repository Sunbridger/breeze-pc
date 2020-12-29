import App from '@/App.vue';

const factory = create(App, {

    // 可以传入每个单文件组件自身的依赖和选项
    use: {
    }
});

describe('App.vue', () => {
    it('renders a div', () => {
        const wrapper = factory({
            mocks: { }
        });

        expect(wrapper.contains('div')).toBe(true);
    });
});
