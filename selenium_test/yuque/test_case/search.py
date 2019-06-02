#encoding utf-8
from selenium import webdriver 
import unittest,time
import ddt
import xlrd
from selenium.webdriver.common.keys import Keys

test_url = "https://www.yuque.com/search?q=search"
test_data_file = "yuque/data/search_info.xlsx"
search_input_xpath = ".//*[@placeholder='搜索']"
search_button_xpath = "ant-dropdown-menu-item"

def get_xldata(file_name):
    rows=[] 
    book=xlrd.open_workbook(file_name) 
    sheet=book.sheet_by_index(0)
    for row_idx in range(1,sheet.nrows):
        rows.append(list(sheet.row_values(row_idx,0,sheet.ncols))) 
        # print('row_ids:{}, sheet.ncols:{}'.format(row_idx,sheet.ncols))
    print(rows)
    return rows

@ddt.ddt
class SearchTestDemo(unittest.TestCase):
    @classmethod
    def setUpClass(self): 
        self.driver = webdriver.Firefox()
        self.driver.get(test_url)
        self.driver.implicitly_wait(5)
        self.driver.set_window_size(1800, 600)

    @ddt.data(*get_xldata(test_data_file)) 
    @ddt.unpack
    def test_dataDrienByObj(self, search_text, except_text):
        try:
            self.driver.find_element_by_xpath(search_input_xpath).clear()
            self.driver.find_element_by_xpath(search_input_xpath).send_keys(search_text)
            time.sleep(1)
            self.driver.find_element_by_xpath(search_input_xpath).send_keys(Keys.ENTER)   
            # 滚动页面
            for i in range(20):
                js = 'window.scrollTo(0,' + str(15*i) + ')'
                self.driver.execute_script(js)
                time.sleep(0.05)
            # 验证是否找到
            self.assertTrue(except_text in self.driver.page_source)
            self.driver.refresh()
        except Exception as e:
            print(e)
            self.assertTrue(False)

    @classmethod
    def tearDownClass(self): 
        self.driver.quit() 

if __name__=='__main__':
    unittest.main()
