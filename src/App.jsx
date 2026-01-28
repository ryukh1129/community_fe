import { useState } from 'react';

const App = () => {
  // 샘플 데이터: 실제로는 백엔드 API에서 가져올 데이터의 형태입니다.
  const [posts] = useState([
    { id: 1, category: '질문', title: 'React v19에서 달라진 점이 무엇인가요?', author: '홍길동', likes: 12, comments: 5, date: '10분 전' },
    { id: 2, category: '정보', title: 'Tailwind CSS v4 설정 꿀팁 공유합니다.', author: '김코딩', likes: 45, comments: 21, date: '2시간 전' },
    { id: 3, category: '자유', title: '오늘 점심 뭐 드셨나요? 세종시 맛집 추천받아요.', author: '이루피', likes: 8, comments: 32, date: '5시간 전' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 상단 네비게이션 바 */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">COMMUNITY_FE</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-indigo-100">
            글쓰기
          </button>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 왼쪽: 게시글 리스트 (2컬럼 차지) */}
        <section className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">최신 게시글</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-100">인기순</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-sm font-bold cursor-pointer">최신순</span>
            </div>
          </div>

          {posts.map((post) => (
            <div key={post.id} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase">{post.category}</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold group-hover:text-indigo-600 transition-colors mb-2">{post.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">{post.author}</span>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1 text-sm">
                    <span>❤️</span> {post.likes}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>💬</span> {post.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 오른쪽: 사이드바 (인기 태그 등) */}
        <aside className="hidden md:block space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              🔥 인기 태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Spring', 'Java', 'Tailwind', 'CS면접', 'Portfolio'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-md text-sm text-gray-600 transition-colors cursor-pointer border border-transparent hover:border-indigo-100">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl">
            <p className="font-bold text-lg mb-2">오늘의 공부 인증 📚</p>
            <p className="text-sm text-indigo-100 mb-4">현재 1,240명이 열공 중!</p>
            <button className="w-full bg-white text-indigo-600 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              참여하기
            </button>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default App;