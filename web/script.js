const jobData = [
  {
    id: 'j1',
    title: 'Nhân viên hành chính',
    company: 'Công ty A',
    location: 'Hà Nội',
    field: 'hành chính',
    description:
      'Thực hiện các công việc văn phòng, hỗ trợ tổ chức sự kiện, ghi chép biên bản họp. Thời gian làm việc linh hoạt.',
  },
  {
    id: 'j2',
    title: 'Công nhân sản xuất nhẹ nhàng',
    company: 'Nhà máy B',
    location: 'Hồ Chí Minh',
    field: 'sản xuất',
    description:
      'Tham gia các công đoạn nhẹ nhàng trong dây chuyền sản xuất, có hỗ trợ đặc biệt cho người khuyết tật.',
  },
  {
    id: 'j3',
    title: 'Nhân viên bán hàng trực tuyến',
    company: 'Shop C',
    location: 'Đà Nẵng',
    field: 'bán hàng',
    description:
      'Quản lý gian hàng online, hỗ trợ khách hàng qua điện thoại, phù hợp người sử dụng máy tính thành thạo.',
  },
  {
    id: 'j4',
    title: 'Trợ giảng trực tuyến',
    company: 'Trung tâm D',
    location: 'Cần Thơ',
    field: 'giáo dục',
    description:
      'Phối hợp hỗ trợ giảng viên chính, soạn tài liệu và hướng dẫn học viên qua các nền tảng trực tuyến.',
  },
  {
    id: 'j5',
    title: 'Nhân viên IT hỗ trợ',
    company: 'Công ty E',
    location: 'Hà Nội',
    field: 'công nghệ',
    description:
      'Hỗ trợ kỹ thuật, bảo trì hệ thống máy tính, phần mềm cho nhân viên trong công ty, có đào tạo nội bộ.',
  }
];

const jobListElem = document.querySelector('.job-list');
const searchBtn = document.getElementById('btn-search');
const keywordInput = document.getElementById('search-keyword');
const fieldSelect = document.getElementById('search-field');
const locationSelect = document.getElementById('search-location');

function createJobCard(job) {
  const article = document.createElement('article');
  article.className = 'job-card';
  article.setAttribute('tabindex', '0');
  article.innerHTML = `
    <h2>${job.title}</h2>
    <div class="company-location">${job.company} - ${job.location}</div>
    <p class="description">${job.description}</p>
    <button class="btn-apply" aria-label="Ứng tuyển vào vị trí ${job.title} tại ${job.company}">Ứng tuyển</button>
  `;
  const btnApply = article.querySelector('.btn-apply');
  btnApply.addEventListener('click', () => {
    alert('Cảm ơn bạn đã quan tâm. Vui lòng gửi hồ sơ vào email: tuyendung@example.com');
  });
  return article;
}

function renderJobList(jobs) {
  jobListElem.innerHTML = '';
  if (jobs.length === 0) {
    jobListElem.innerHTML = '<p>Không tìm thấy việc làm phù hợp.</p>';
    return;
  }
  jobs.forEach(job => {
    const card = createJobCard(job);
    jobListElem.appendChild(card);
  });
}

function filterJobs() {
  const keyword = keywordInput.value.trim().toLowerCase();
  const field = fieldSelect.value;
  const location = locationSelect.value;

  const filtered = jobData.filter(job => {
    const matchKeyword =
      keyword === '' ||
      job.title.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword);

    const matchField = field === '' || job.field === field;
    const matchLocation = location === '' || job.location.toLowerCase() === location;
    return matchKeyword && matchField && matchLocation;
  });

  return filtered;
}

function onSearch() {
  const results = filterJobs();
  renderJobList(results);
}

// Initial render all jobs
renderJobList(jobData);

searchBtn.addEventListener('click', onSearch);

// Enable searching when pressing Enter
keywordInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') onSearch();
});
